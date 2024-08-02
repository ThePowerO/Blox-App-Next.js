import React from "react";
import CombosDisplay from "../YourCombos/CombosDisplay";
import prisma from "@/lib/prisma";
import ProfileSideBar from "./ProfileSideBar";

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
      commentLikes: true,
      comments: {
        include: {
          likes: true,
          user: true,
          combo: true,
        }
      }
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
    <section>
      <div className="block md:hidden pt-3">
        <ProfileSideBar isUsersPage={false} ParamsUserId={ParamsUserId} />
      </div>
      <CombosDisplay isCombosPage={false} ParamsUserId={id} user={user as any} isProfilePage={true} comboData={comboData as any} />
    </section>
  );
}
