import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Pencil, Trophy } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import UserContent from "./UserContent";
import { Combo, User } from "@/lib/types";

type Props = {
  ParamsUserId: string;
};

export default async function UserMainContent({ ParamsUserId }: Props) {
  const sesison = await getServerSession(authOptions);
  const currentUser = sesison?.user;
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

  const combo = await prisma.combo.findMany({
    where: {
      userId: id,
    },
    include: {
      likes: true,
      favorites: true,
    },
  });

  return (
    <>
      <div>
        <UserContent user={user as unknown as User} combo={combo as unknown as Combo} />
      </div>
    </>
  );
}
