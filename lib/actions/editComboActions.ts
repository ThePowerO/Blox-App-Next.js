"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getComboById(comboId: string) {
  const data = await prisma.combo.findUnique({
    where: { id: comboId },
    select: {
      id: true,
      userId: true,
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
      likes: {
        select: {
          id: true,
          comboId: true,
          userId: true,
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
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return data;
}

const UpdateTitleSchema = z.object({
  comboId: z.string({
    invalid_type_error: "Invalid ComboId",
  }),
  comboTitle: z.string({
    invalid_type_error: "Invalid Title",
  }),
  pathName: z.string(),
});

export async function UpdateComboTitle(FormData: unknown) {
  const validatedFields = UpdateTitleSchema.safeParse(FormData);

  if (!validatedFields.success) {
    return {
      erros: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { comboId, comboTitle, pathName } = validatedFields.data;

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

  const uniqueSlug = await generateUniqueSlug(comboTitle);

  const data = await prisma.combo.update({
    where: {
      id: comboId,
    },
    data: {
      combotitle: comboTitle,
      slug: uniqueSlug,
    },
  });

  revalidatePath(pathName);
  return data;
}

const UpdateDescriptionSchema = z.object({
  comboId: z.string({
    invalid_type_error: "Invalid ComboId",
  }),
  comboDescription: z.string({
    invalid_type_error: "Invalid Description",
  }),
});

export async function UpdateComboDescription(FormData: FormData) {
  const pathName = FormData.get("pathName") as string;
  const validatedFields = UpdateDescriptionSchema.safeParse({
    comboId: FormData.get("comboId"),
    comboDescription: FormData.get("comboDescription"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { comboId, comboDescription } = validatedFields.data;

  const data = await prisma.combo.update({
    where: { id: comboId },
    data: {
      combodescription: comboDescription,
    },
  });

  revalidatePath(pathName);
  return data;
}

const UpdateComboImgsSchema = z.object({
  comboId: z.string({
    invalid_type_error: "Invalid ComboId",
  }),
  FightingStyle: z.string({
    invalid_type_error: "Invalid FightingStyle",
  }),
  Fruit: z.string({
    invalid_type_error: "Invalid Fruit",
  }),
  Sword: z.string({
    invalid_type_error: "Invalid Sword",
  }),
  Weapon: z.string({
    invalid_type_error: "Invalid Weapon",
  }),
  pathName: z.string(),
});

export async function UpdateComboImgs(FormData: unknown) {
  const validatedFields = UpdateComboImgsSchema.safeParse(FormData);

  if (!validatedFields.success) {
    return {
      erros: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { comboId, FightingStyle, Fruit, Sword, Weapon, pathName } =
    validatedFields.data;

  const data = await prisma.combo.update({
    where: { id: comboId },
    data: {
      fightingstyle: FightingStyle,
      fruit: Fruit,
      sword: Sword,
      weapon: Weapon,
    },
  });

  revalidatePath(pathName);
  return data;
}

const UpdateComboStatsSchema = z.object({
  comboId: z.string({
    invalid_type_error: "Invalid ComboId",
  }),
  Specialty: z.string({
    invalid_type_error: "Invalid Specialty",
  }),
  Race: z.string({
    invalid_type_error: "Invalid Race",
  }),
  Stats: z.string({
    invalid_type_error: "Invalid Stats",
  }),
  Difficulty: z.string({
    invalid_type_error: "Invalid Difficulty",
  }),
  pathName: z.string(),
});

export async function UpdateComboStatsAction(FormData: unknown) {
  const validatedFields = UpdateComboStatsSchema.safeParse(FormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { comboId, Specialty, Race, Stats, Difficulty, pathName } =
    validatedFields.data;

  const data = await prisma.combo.update({
    where: { id: comboId },
    data: {
      specialty: Specialty,
      race: Race,
      mainStats: Stats,
      difficulty: Difficulty,
    },
  });

  revalidatePath(pathName);
  return data;
}

const UpdateComboVideoSchema = z.object({
  comboId: z.string({
    invalid_type_error: "Invalid ComboId",
  }),
  comboVideo: z.string({
    invalid_type_error: "Invalid VideoId",
  }),
  pathName: z.string(),
});

export async function UpdateComboVideoAction(FormData: unknown) {
  const validatedFields = UpdateComboVideoSchema.safeParse(FormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { comboId, comboVideo, pathName } = validatedFields.data;

  const data = await prisma.combo.update({
    where: { id: comboId },
    data: {
      comboVideo,
    },
  });

  revalidatePath(pathName);
  return data;
}

export async function DeleteComboVideo(FormData: FormData) {
  const pathName = FormData.get("pathName") as string;
  const comboId = FormData.get("comboId") as string;
  const comboVideo = FormData.get("comboVideo") as string;

  const data = await prisma.combo.update({
    where: { id: comboId },
    data: {
      comboVideo,
    },
  });

  revalidatePath(pathName);
  return data;
}
