import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { AlertDestructive } from "../HtmlComponents/ErrorAlert";
import CombosDisplay from "../YourCombos/CombosDisplay";

export default async function CommunityCombos() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;

  const comboData = await prisma.combo.findMany({
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
