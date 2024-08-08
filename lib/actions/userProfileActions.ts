"use server";

import { z } from "zod";
import prisma from "../prisma";
import { user } from "@nextui-org/react";
import { revalidatePath } from "next/cache";
import { add } from "date-fns";

const UpdateUserImgFormSchema = z.object({
  img: z.string({
    invalid_type_error: "Invalid Image"
  }),
  userId: z.string({
    invalid_type_error: "Invalid UserId"
  }),
  pathName: z.string()
});

export async function UserAlreadyExists(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: username
      }
    })
    return user
  } catch (error) {
    console.log(error)
  }
}

export async function UpdateUserImgAction(FormData: unknown) {
  const validatedFields = UpdateUserImgFormSchema.safeParse(FormData)
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { img, userId, pathName } = validatedFields.data

  try {
    const data = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        image: img
      }
    })
    revalidatePath(pathName)
    console.log("Image Updated DB")
    return data
  } catch (error) {
    console.log(error)
  }
}

const UpdateUserNameFormSchema = z.object({
  username: z.string({
    invalid_type_error: "Invalid Username"
  }),
  userId: z.string({
    invalid_type_error: "Invalid UserId"
  }),
  pathName: z.string()
});

export async function UpdateUserNameAction(FormData: unknown) {
  const validatedFields = UpdateUserNameFormSchema.safeParse(FormData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { username, userId, pathName } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  const now = new Date();

  const sameNameUser = await prisma.user.findUnique({
    where: {
      name: username
    }
  })

  try {
    if (user?.nameChangeExpiration && user?.nameChangeExpiration > now || sameNameUser) {
      throw new Error("Cannot change name before expiration date");
    } else {
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          name: username,
          nameChangeExpiration: add(now, { days: 7 })
        }
      })
      revalidatePath(pathName)
      console.log("Username Updated DB")
    }
  } catch (error) {
    console.log(error)
    return {
      error: error
    }
  }
}

const UserDescriptionFormSchema = z.object({
  description: z.string({
    invalid_type_error: "Invalid Description"
  }),
  userId: z.string({
    invalid_type_error: "Invalid UserId"
  }),
  pathName: z.string()
});

export async function UserDescriptionAction(FormData: unknown) {
  const validatedFields = UserDescriptionFormSchema.safeParse(FormData);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  const { description, userId, pathName } = validatedFields.data;
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        description: description
      }
    })
    revalidatePath(pathName)
  } catch (error) {
    console.log(error)
  }
}