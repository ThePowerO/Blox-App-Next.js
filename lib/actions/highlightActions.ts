"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
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
    let UserHighlightExpirationTime;
    if (user.isPlusPack !== false && user.proPack >= 1) {
      UserHighlightExpirationTime = 3;
    } else if (user.isPlusPack === true) {
      UserHighlightExpirationTime = 3;
    } else if (user.proPack >= 1) {
      UserHighlightExpirationTime = 2;
    } else if (user.proPack === 0 && user.isPlusPack === false) {
      UserHighlightExpirationTime = 1;
    }

    const data = await prisma.combo.update({
      where: {
        id: comboId,
      },
      data: {
        highlight: "HIGHLIGHTED",
        highlightExpiration: add(new Date(), { days: UserHighlightExpirationTime }),
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