import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import CombosDisplay from "./CombosDisplay";
import { AlertDestructive } from "../HtmlComponents/ErrorAlert";

export default async function YourCombos() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;

  const comboData = await prisma.combo.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      favorites: true,
      likes: true,
    }
  });

  return (
    <div className="p-4">
      {comboData.length === 0 ? (
        <AlertDestructive />
      ) : (
        <CombosDisplay comboData={comboData as any} />
      )}
    </div>
  );
}
