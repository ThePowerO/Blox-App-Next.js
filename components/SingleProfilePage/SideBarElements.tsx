"use client";

import ManageSubscriptionBtn from "@/app/[locale]/profile/ManageSubscriptionBtn";
import { User } from "@prisma/client";
import { Gem, MessageCircleMore, TrendingUp, Trophy } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  user: User | null;
  isUsersPage: boolean;
};

export default function SideBarElements({ isUsersPage, user }: Props) {
  const t = useTranslations("ProfilePage");
  const t2 = useTranslations("UsersPage");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const selectedFilter = searchParams.get("filter");
  const SideBarElements = [
    {
      name: isUsersPage === true ? `${t2("MostCombos")}` : `${t("TopCombos")}`,
      icon: <Trophy size={20} />,
      url: isUsersPage === true ? "MostCombos" : "TopCombos",
    },
    {
      name:
        isUsersPage === true ? `${t2("MostComments")}` : `${t("TopComments")}`,
      icon: <MessageCircleMore size={20} />,
      url: isUsersPage === true ? "MostComments" : "TopComments",
    },
    {
      name: isUsersPage === true ? `${t2("MostLikes")}` : `${t("Relevant")}`,
      icon: <TrendingUp size={20} />,
      url: isUsersPage === true ? "MostLikes" : "Relevant",
    },
  ];

  return (
    <>
      {SideBarElements.map((Element) => {
        return (
          <li key={Element.name} className="apperance-none">
            <Link
              href={`?${new URLSearchParams({
                filter: `${Element.url}`,
              })}`}
              className={`${
                selectedFilter === Element.url ? "text-blue-500" : ""
              } flex hover:underline cursor-pointer items-center gap-2`}
            >
              {Element.icon}
              {Element.name}
            </Link>
          </li>
        );
      })}
      {isUsersPage === true && (
        <>
          <li className="apperance-none">
            <Link
              href={`?${new URLSearchParams({
                filter: "PlusMember",
              })}`}
              className={`${
                selectedFilter === "PlusMember" ? "text-blue-500" : ""
              } flex hover:underline cursor-pointer items-center gap-2`}
            >
              <Gem size={20} />
              {t2("PlusMembers")}
            </Link>
          </li>
          <li className="apperance-none">
            <Link
              href={`/${locale}/users`}
              className={`flex border rounded-lg p-1 text-sm hover:underline cursor-pointer items-center gap-2`}
            >
              Remove Filters
            </Link>
          </li>
        </>
      )}
    </>
  );
}
