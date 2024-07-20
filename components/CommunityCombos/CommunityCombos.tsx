import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { AlertDestructive } from "../HtmlComponents/ErrorAlert";
import CombosDisplay from "../YourCombos/CombosDisplay";

export default async function CommunityCombos() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  const comboData = await prisma.combo.findMany({
    include: {
      favorites: true,
      likes: true,
    }
  });

  const user = await prisma.user.findUnique({
    where: { id: currentUser?.id },
  });

  return (
    <div className="p-4">
      {comboData.length === 0 ? (
        <AlertDestructive />
      ) : (
        <CombosDisplay user={user as User} comboData={comboData as any} />
      )}
    </div>
  );
}
