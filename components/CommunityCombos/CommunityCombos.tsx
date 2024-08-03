

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";
import prisma from "@/lib/prisma";
import { AlertDestructive } from "../HtmlComponents/ErrorAlert";
import CombosDisplay from "../YourCombos/CombosDisplay";
import CombosDisplayFallback from "../YourCombos/CombosDisplayFallback";

export default async function CommunityCombos() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;

  const comboData = await prisma.combo.findMany({
    include: {
      favorites: true,
      likes: true,
      user: true,
    }
  });

  if (!currentUser) {
    return (
        <CombosDisplay isCombosPage={true} ParamsUserId="" isProfilePage={false} user={{} as any} comboData={comboData as any} />
    )
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser?.id },
  });

  return (
    <div className="p-4">
      {comboData.length === 0 ? (
        <AlertDestructive />
      ) : (
        <CombosDisplay isCombosPage={true} ParamsUserId="" isProfilePage={false} user={user as any} comboData={comboData as any} />
      )}
    </div>
  );
}
