import { MessageCircleMore, TrendingUp, Trophy, User } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";
import SideBarElements from "./SideBarElements";
import prisma from "@/lib/prisma";

type Props = {
  ParamsUserId: string;
};

export default async function ProfileSideBar({ ParamsUserId }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      id: ParamsUserId,
    },
  });

  return (
    <div>
      <ul className="flex flex-col gap-5">
        <li>
          <span className="flex hover:underline cursor-pointer items-center gap-2">
            <User size={20} /> <p>{user?.name}</p>
          </span>
        </li>
        <SideBarElements />
      </ul>
    </div>
  );
}
