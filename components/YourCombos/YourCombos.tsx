import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "@/lib/prisma";
import { Combo, User } from "@prisma/client";
import CombosDisplay from "./CombosDisplay";
import { AlertDestructive } from "../HtmlComponents/ErrorAlert";

export default async function YourCombos() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;

  if (!currentUser) {
    return <AlertDestructive />
  }

  const comboData = await prisma.combo.findMany({
    where: {
      userId: currentUser?.id,
    },

    include: {
      favorites: true,
      likes: true,
    }
  });

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser?.id,
    },
  });

  return (
    <div className="p-4">
      {comboData.length === 0 ? (
        <AlertDestructive />
      ) : (
        <CombosDisplay isProfilePage={false} user={user as User} comboData={comboData as any} />
      )}
    </div>
  );
}
