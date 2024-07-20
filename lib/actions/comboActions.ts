"use server";

import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Combo } from "../types";
import { z } from "zod";
import { User } from "@prisma/client";
import createComboCountLimit, { checkUserComboLimit } from "./countLimitActions";

const CreateComboFormSchema = z.object({
  combotitle: z.string({
    invalid_type_error: "Invalid Title",
  }),
  combodescription: z.string({
    invalid_type_error: "Invalid Description",
  }),
  comboVideo: z.string({
    invalid_type_error: "Invalid VideoId",
  }),
  fruit: z.string({
    invalid_type_error: "Invalid Fruit",
  }),
  fightingstyle: z.string({
    invalid_type_error: "Invalid FightingStyle",
  }),
  sword: z.string({
    invalid_type_error: "Invalid Sword",
  }),
  weapon: z.string({
    invalid_type_error: "Invalid Weapon",
  }),
  race: z.string({
    invalid_type_error: "Invalid Race",
  }),
  difficulty: z.string({
    invalid_type_error: "Invalid Difficulty",
  }),
  specialty: z.string({
    invalid_type_error: "Invalid Specialty",
  }),
  mainStats: z.string({
    invalid_type_error: "Invalid Stats",
  }),
});

export async function createComboAction(FormData: unknown, pathName: string) {
  const session = await getServerSession(authOptions);
  const currentuser = session?.user as User;
  const validatedFields = CreateComboFormSchema.safeParse(FormData);

  if (!validatedFields.success) {
    console.error(
      "Validation errors:",
      validatedFields.error.flatten().fieldErrors
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const {
    combotitle,
    combodescription,
    comboVideo,
    fruit,
    fightingstyle,
    sword,
    weapon,
    race,
    difficulty,
    specialty,
    mainStats,
  } = validatedFields.data;

  const customEncodeURIComponent = (str: string) => {
    return encodeURIComponent(str)
      .replace(/%2F/g, "-") // Replace / with -
      .replace(/%20/g, "-") // Replace space with -
      .replace(/%25/g, "") // Remove %
      .replace(/%5B/g, "") // Remove [
      .replace(/%5D/g, "") // Remove ]
      .replace(/%7B/g, "") // Remove {
      .replace(/%7D/g, "") // Remove }
      .replace(/%3A/g, "-") // Remove :
      .replace(/%2C/g, "") // Remove ,
      .replace(/%3B/g, "") // Remove ;
      .replace(/%3F/g, "") // Remove ?
      .replace(/%3D/g, "") // Remove =
      .replace(/%40/g, "-") // Remove @
      .replace(/%26/g, "and") // Replace & with 'and'
      .replace(/%24/g, "") // Remove $
      .replace(/%23/g, "") // Remove #
      .replace(/%5C/g, "-"); // Remove \
  };

  const generateUniqueSlug = async (title: string) => {
    let slug = customEncodeURIComponent(title);
    let existingCombo = await prisma.combo.findUnique({
      where: { slug },
    });
    let counter = 1;
    while (existingCombo) {
      slug = `${customEncodeURIComponent(title)}-${counter}`;
      existingCombo = await prisma.combo.findUnique({
        where: { slug },
      });
      counter++;
    }
    return slug;
  };

  try {
    const uniqueSlug = await generateUniqueSlug(combotitle);
    const data = await prisma.combo.create({
      data: {
        combotitle,
        combodescription,
        comboVideo,
        fruit,
        fightingstyle,
        sword,
        weapon,
        race,
        difficulty,
        specialty,
        mainStats,
        slug: uniqueSlug,
        user: {
          connect: {
            id: currentuser.id,
          },
        }
      },
    });

    await createComboCountLimit();

    revalidatePath(pathName);
    return data;
  } catch (error) {
    console.error("Error creating combo:", error);
    throw error;
  }
}

export async function addComboLike(FormData: FormData) {
  const comboId = FormData.get("comboId") as string;
  const userId = FormData.get("userId") as string;
  const pathName = FormData.get("pathName") as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.error("User not found.");
      return;
    };

    const combo = await prisma.combo.findUnique({
      where: {
        id: comboId,
      },
    });

    if (!combo) {
      console.error("Combo not found.");
      return;
    };

    await prisma.like.create({
      data: {
        comboId,
        userId,
      },
    });

    revalidatePath(pathName);
  } catch (error) {
    console.error(error);
  }
}

export async function removeComboLike(FormData: FormData) {
  const session: any = await getServerSession(authOptions);
  const comboId = FormData.get("likeId") as string;
  const pathName = FormData.get("pathName") as string;
  const likeId = FormData.get("likeId") as string;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  if (!user) {
    console.error("User not found.");
    return;
  }

  await prisma.like.delete({
    where: {
      id: likeId,
      userId: user.id,
    },
  });

  revalidatePath(pathName);
}

export async function addComboFavorite(FormData: FormData) {
  const comboId = FormData.get("comboId") as string;
  const userId = FormData.get("userId") as string;
  const pathName = FormData.get("pathName") as string;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.error("User not found.");
      return;
    };

    const combo = await prisma.combo.findUnique({
      where: {
        id: comboId,
      },
    });

    if (!combo) {
      console.error("Combo not found.");
      return;
    };

    await prisma.favorite.create({
      data: {
        comboId,
        userId,
      },
    });

    revalidatePath(pathName);
  } catch (error) {
    console.error(error);
  }
}

export async function removeComboFavorite(FormData: FormData) {
  const session: any = await getServerSession(authOptions);
  const comboId = FormData.get("comboId") as string;
  const pathName = FormData.get("pathName") as string;
  const favoriteId = FormData.get("favoriteId") as string;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  if (!user) {
    console.error("User not found.");
    return;
  }

  await prisma.favorite.delete({
    where: {
      id: favoriteId,
      userId: user.id,
    },
  });

  revalidatePath(pathName);
}

export async function deleteCombo(formData: FormData) {
  const comboId = formData.get("comboId") as string;
  const pathName = formData.get("pathName") as string;

  const session = await getServerSession(authOptions);
  const sessionUser = session?.user as User;
  const user = await prisma.user.findUnique({
    where: {
      id: sessionUser?.id,
    },
  });

  if (!session?.user) {
    return;
  }

  if (!user) {
    return;
  }

  await prisma.combo.delete({
    where: {
      id: comboId,
    },
  });

  await prisma.comboCountLimit.update({
    where: {
      userId: sessionUser?.id,
    },
    data: {
      count: -1,
    },
  });

  revalidatePath(pathName);
}

export async function getSlugCombo(slug: string) {
  const session = await getServerSession(authOptions);

  const data = await prisma.combo.findFirst({
    where: { slug: slug },
    select: {
      id: true,
      difficulty: true,
      userId: true,
      slug: true,
      combotitle: true,
      combodescription: true,
      fightingstyle: true,
      weapon: true,
      fruit: true,
      sword: true,
      specialty: true,
      createdAt: true,
      updatedAt: true,
      mainStats: true,
      comboVideo: true,
      race: true,
      comments: {
        select: {
          id: true,
          text: true,
          createdAt: true,
          updatedAt: true,
          replies: {
            select: {
              id: true,
              text: true,
              parentId: true,
              userId: true,
              createdAt: true,
              updatedAt: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  createdAt: true,
                },
              },
              likes: {
                select: {
                  id: true,
                  replyId: true,
                  userId: true,
                  createdAt: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              createdAt: true,
            },
          },
          userId: true,
          comboId: true,
          likes: {
            select: {
              id: true,
              commentId: true,
              userId: true,
              createdAt: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          createdAt: true,
        },
      },
      favorites: {
        select: {
          id: true,
          comboId: true,
          userId: true,
          createdAt: true,
        },
      },
      likes: {
        select: {
          id: true,
          comboId: true,
          userId: true,
          createdAt: true,
        },
      },
    },
  });

  return data;
}