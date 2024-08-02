import React from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Trophy } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { User } from "@/lib/types";
import Link from "next/link";
import UsersCards from "./UsersCards";
import SideBarElements from "../SingleProfilePage/SideBarElements";
import ProfileSideBar from "../SingleProfilePage/ProfileSideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

type Props = {
  users: User[];
  currentUser?: currentUser
};

type currentUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
} | undefined

export default function UsersPage({ users, currentUser }: Props) {
  const t = useTranslations("UsersPage");
  return (
    <main className="p-6 flex">
      <section className="hidden md:block w-[200px] p-3 pt-8 border-r-2">
        <ProfileSideBar isUsersPage={true} ParamsUserId={currentUser?.id as string || ""} />
      </section>
      <section className="w-full p-4">
        <h1 className="text-2xl font-bold mb-7">{t("UsersPage")}</h1>
        <div className="block md:hidden border rounded-lg p-3 mb-5">
          <ProfileSideBar isUsersPage={true} ParamsUserId={currentUser?.id as string || ""} />
        </div>
        <UsersCards users={users} />
      </section>
    </main>
  );
}
