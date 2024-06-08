"use server";

import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Combo } from "../types";
import { z } from "zod";
import { User } from "@prisma/client";

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
  const validatedFileds = CreateComboFormSchema.safeParse(FormData);

  if (!validatedFileds.success) {
    console.error(
      "Validation errors:",
      validatedFileds.error.flatten().fieldErrors
    );
    return {
      errors: validatedFileds.error.flatten().fieldErrors,
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
  } = validatedFileds.data;

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

  try {
    const data = await prisma.combo.create({
      data: {
        userId: currentuser.id,
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
        slug: customEncodeURIComponent(combotitle),
      },
    });

    revalidatePath(pathName);
    return data;
  } catch (error) {
    console.error("Error creating combo:", error);
    throw error;
  }
}

export async function addComboLike(FormData: FormData) {
  const session = await getServerSession(authOptions);
  const comboId = FormData.get("comboId") as string;
  const userId = FormData.get("userId") as string;
  const pathName = FormData.get("pathName") as string;

  try {
    const combo = await prisma.combo.findUnique({
      where: {
        id: comboId,
      },
      include: {
        likes: true,
      },
    });

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
  const comboId = FormData.get("comboId") as string;
  const pathName = FormData.get("pathName") as string;

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
      comboId_userId: {
        comboId,
        userId: session?.user?.id,
      },
    },
  });

  revalidatePath(pathName);
}

export async function addFavoriteCombo(formData: FormData) {
  const session = await getServerSession(authOptions);
  const comboId = formData.get("comboId") as string;
  const pathName = formData.get("pathName") as string;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    include: {
      favorites: true,
    },
  });

  if (!user) {
    console.error("User not found.");
    return;
  }

  const combo = await prisma.combo.findUnique({
    where: {
      id: comboId,
    },
    include: {
      favorites: true,
      likes: true,
    },
  });

  if (!combo) {
    console.error("Combo not found.");
    return;
  }

  const isFavorite = user.favorites.some(
    (favorite) => favorite.comboId === comboId
  );

  if (isFavorite) {
    console.log("Combo already favorite.");
    return;
  } else {
    await prisma.favorite.create({
      data: {
        user: {
          connect: {
            email: session?.user?.email!,
          },
        },
        combo: {
          connect: {
            id: comboId,
          },
        },
      },
    });

    revalidatePath(pathName);
  }
}

export async function removeFavoriteCombo(formData: FormData) {
  const session = await getServerSession(authOptions);

  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathName") as string;

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
    where: { id: favoriteId },
  });

  revalidatePath(pathName);
}

export async function deleteCombo(formData: FormData) {
  const comboId = formData.get("comboId") as string;
  const pathName = formData.get("pathName") as string;

  await prisma.combo.delete({
    where: {
      id: comboId,
    },
  });

  revalidatePath(pathName);
}

export async function getSlugCombo(slug: string) {
  const session = await getServerSession(authOptions);

  const data = await prisma.combo.findUnique({
    where: { slug: slug },
    select: {
      id: true,
      difficulty: true,
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
          comboId: true,
          userId: true,
          createdAt: true,
        },
      },
    },
  });

  return data;
}