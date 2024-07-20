"use server";

import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";
import { MAX_COMBO_COUNT, MAX_COMBO_COUNT_8 } from "../constants";

export default async function createComboCountLimit() {
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

  const userComboLimit = await prisma.comboCountLimit.findUnique({
    where: { userId: sessionUser?.id },
  });

  if (userComboLimit) {
    await prisma.comboCountLimit.update({
      where: {
        userId: sessionUser?.id,
      },
      data: {
        count: userComboLimit.count + 1,
      },
    });
  } else {
    await prisma.comboCountLimit.create({
      data: {
        userId: sessionUser?.id,
        count: 1,
      },
    });
  }
}

export async function checkUserComboLimit() {
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

  const userComboLimit = await prisma.comboCountLimit.findUnique({
    where: { userId: sessionUser?.id },
  });

  if (!userComboLimit || userComboLimit.count < MAX_COMBO_COUNT) {
    return true;
  }
  {
    return false;
  }
}

export async function checkUserComboLimit8() {
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

  const userComboLimit = await prisma.comboCountLimit.findUnique({
    where: { userId: sessionUser?.id },
  });

  if (user.starterPack >= 1) {
    if (!userComboLimit || userComboLimit.count < MAX_COMBO_COUNT_8) {
      return true;
    }
    {
      return false;
    }
  }
}

export async function checkUserComboLimitINF() {
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

  const userComboLimit = await prisma.comboCountLimit.findUnique({
    where: { userId: sessionUser?.id },
  });

  if (user.proPack >= 1 || user.isPlusPack === true) {
    return true;
  } else {
    return false;
  }
}