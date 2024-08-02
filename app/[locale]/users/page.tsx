import UsersPage from "@/components/UsersPage/UsersPage";
import React from "react";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function page() {
  const users = await prisma.user.findMany({
    include: {
      Combo: {
        include: {
          likes: true,
          favorites: true,
        },
      },
      comments: true,
    }
  });

  const session = await getServerSession(authOptions);
  const currentUser = session?.user;
  return (
    <UsersPage users={users as any} currentUser={currentUser} />
  );
}
