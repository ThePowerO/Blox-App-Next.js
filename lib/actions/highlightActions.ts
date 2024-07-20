"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import cron from "node-cron";
import { add } from "date-fns";

const HighlightComboFormSchema = z.object({
  comboId: z.string({
    invalid_type_error: "Invalid ComboId",
  }),
  pathName: z.string({
    invalid_type_error: "Invalid pathName",
  }),
});

export default async function HighlightCombo(FormData: unknown) {
  const validatedFields = HighlightComboFormSchema.safeParse(FormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { comboId, pathName } = validatedFields.data;

  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser?.id,
    },
  });

  if (!user) {
    return null;
  }

  const combo = await prisma.combo.findUnique({
    where: {
      id: comboId,
    },
  });

  if (!combo) {
    return null;
  }

  try {
    const data = await prisma.combo.update({
      where: {
        id: comboId,
      },
      data: {
        highlight: "HIGHLIGHTED",
        highlightExpiration: add(new Date(), { days: 1 }),
      },
    });

    await prisma.user.update({
      where: {
        id: user?.id,
      },
      data: {
        highlights: user?.highlights - 1,
      },
    });

    revalidatePath(pathName);
    return data;
  } catch (error) {
    console.error(error);
  }
}

cron.schedule("* * * * * *", async () => {
  try {
    const now = new Date();

    const expiredCombos = await prisma.combo.findMany({
      where: {
        highlight: "HIGHLIGHTED",
        highlightExpiration: {
          lte: now,
        },
      },
    });

    console.log("Expired combos:", expiredCombos);

    const user = await prisma.user.findUnique({
      where: {
        id: expiredCombos[0].userId,
      },
    });

    if (!user) {
      return;
    }

    for (const combo of expiredCombos) {
      if (combo.isAutoRenovate === true) {
        if (user.highlights === 0) {
          console.log("User does not have any highlights");
          await prisma.combo.update({
            where: {
              id: combo.id,
              isAutoRenovate: true,
            },
            data: {
              highlight: "NONE",
              highlightExpiration: null,
              isAutoRenovate: false,
            },
          });
          return null;
        } else {
          let UserHighlightExpirationTime
          if (user.proPack >= 1) {
            UserHighlightExpirationTime = 2
          } else if (user.isPlusPack === true) {
            UserHighlightExpirationTime = 3
          } else if (user.isPlusPack !== false && user.proPack >= 1) {
            UserHighlightExpirationTime = 3
          } else {
            UserHighlightExpirationTime = 1
          }

          console.log("Renovating combo!:", combo.id);
          await prisma.combo.update({
            where: {
              id: combo.id,
              isAutoRenovate: true,
            },
            data: {
              highlight: "HIGHLIGHTED",
              highlightExpiration: add(now, { days: UserHighlightExpirationTime }),
            },
          });

          await prisma.user.update({
            where: {
              id: combo?.userId!,
            },
            data: {
              highlights: user.highlights - 1,
            },
          });
        }
      } else {
        console.log("Resetting combo!:", combo.id);
        await prisma.combo.updateMany({
          where: {
            highlight: "HIGHLIGHTED",
            highlightExpiration: {
              lte: now,
            },
          },
          data: {
            highlight: "NONE",
            highlightExpiration: null,
          },
        });
      }
    }
  } catch (error) {
    console.error("Error resetting expired highlights:", error);
  }

  revalidatePath("/");
});

const RenovateComboStatusFormSchema = z.object({
  comboId: z.string({
    invalid_type_error: "Invalid ComboId",
  }),
  isAutoRenovate: z.boolean({
    invalid_type_error: "Invalid isAutoRenovate",
  }),
  pathName: z.string({
    invalid_type_error: "Invalid pathName",
  }),
});

export async function autoRenovateHighlight(FormData: unknown) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;

  const validatedFields = RenovateComboStatusFormSchema.safeParse(FormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { comboId, isAutoRenovate, pathName } = validatedFields.data;

  if (!currentUser) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser?.id,
    },
  });

  if (!user) {
    return null;
  }

  const combo = await prisma.combo.findUnique({
    where: {
      id: comboId,
    },
  });

  if (!combo) {
    return null;
  }

  try {
    await prisma.combo.update({
      where: {
        id: comboId,
      },
      data: {
        isAutoRenovate: isAutoRenovate,
      },
    });
  } catch (error) {
    console.log("Error renovating highlights:", error);
  }

  revalidatePath(pathName);
}

cron.schedule("* * * * * *", async () => {
  try {
    const now = new Date();

    const expiredPlusPackWeeklyTime = await prisma.user.findMany({
      where: {
        isPlusPack: true,
        plusPackWeeklyTime: {
          lte: now,
        },
      }
    });

    for (const user of expiredPlusPackWeeklyTime) {
      await prisma.user.update({
        where: {
          id: user.id,
          isPlusPack: true,
        },
        data: {
          highlights: user.highlights + 15,
          plusPackWeeklyTime: add(now, { days: 7 }),
        },
      });
    }
  } catch (error) {
    
  }

  revalidatePath("/");
});