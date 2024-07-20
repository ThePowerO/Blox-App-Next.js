import React from "react";
import CombosDisplay from "../YourCombos/CombosDisplay";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

type Props = {
  ParamsUserId: string;
};

export default async function ProflieCombos({ ParamsUserId }: Props) {
  const id = ParamsUserId;

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      Combo: true,
      comments: true,
    },
  });

  const comboData = await prisma.combo.findMany({
    where: {
      userId: id,
    },
    include: {
      favorites: true,
      likes: true,
      comments: {
        include: {
          likes: true,
          user: true,
        }
      },
    },
  })

  return (
    <CombosDisplay ParamsUserId={id} user={user as User} isProfilePage={true} comboData={comboData as any} />
  );
}
