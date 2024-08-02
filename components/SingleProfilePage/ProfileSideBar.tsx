import { MessageCircleMore, TrendingUp, Trophy, User } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";
import SideBarElements from "./SideBarElements";
import prisma from "@/lib/prisma";

type Props = {
  ParamsUserId: string;
  isUsersPage: boolean;
};

export default async function ProfileSideBar({ ParamsUserId, isUsersPage }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      id: ParamsUserId,
    },
  });

  return (
    <div>
      <ul className="grid grid-cols-1 petit:grid-cols-2 sm:flex md:flex-col gap-5">
        {isUsersPage === false && (
          <li>
            <span className="flex hover:underline cursor-pointer items-center gap-2">
              <User size={20} /> <p>{user?.name}</p>
            </span>
          </li>
        )}
        <SideBarElements isUsersPage={isUsersPage} />
      </ul>
    </div>
  );
}
