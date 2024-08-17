"use client";

import React, { useState } from "react";
import prisma from "@/lib/prisma";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Info, Trophy } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { User } from "@/lib/types";
import Link from "next/link";
import { Input } from "../ui/input";
import TextareaAutosize from "react-textarea-autosize";
import { useSearchParams } from "next/navigation";
import ProfileSideBar from "../SingleProfilePage/ProfileSideBar";
import { useSession } from "next-auth/react";

type Props = {
  users: User[];
};

export default function UsersCards({ users }: Props) {
  const t = useTranslations("ProfilePage");
  const t2 = useTranslations("CommentSection");
  const t3 = useTranslations("UsersPage");

  const { data: session } = useSession();
  const currentUser = session?.user;

  const locale = useLocale();

  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const selectedFilter = searchParams.get("filter");

  console.log("selectedFilter", selectedFilter);
  console.log("searchValue", searchValue);

  const filteredUsers = users
    .filter((users) =>
      users.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter((users) => {
      if (selectedFilter === "PlusMember") {
        return users.isPlusPack === true;
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      if (selectedFilter === "MostCombos") {
        return b.Combo.length - a.Combo.length;
      } else if (selectedFilter === "MostComments") {
        return b.comments.length - a.comments.length;
      } else if (selectedFilter === "MostLikes") {
        return (
          b.Combo.filter((combo) => combo.likes.length > 0).length -
          a.Combo.filter((combo) => combo.likes.length > 0).length
        );
      } else {
        return 0;
      }
    });

  return (
    <>
      <section className="flex flex-col gap-5">
        <Input
          type="text"
          placeholder={t3("SearchUser")}
          onChange={(e) => setSearchValue(e.target.value)}
          className="border rounded-lg p-2"
        />
        {searchValue === "" && selectedFilter === null && (
          <div className="flex border rounded-lg p-2 items-center gap-2">
            <Info size={20} />
            <p className="text-sm"> {t3("SearchUsersMessage")}</p>
          </div>
        )}
        {(searchValue !== "" || selectedFilter !== null) &&
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`w-full flex border rounded-lg p-2 gap-3`}
            >
              <div className="hidden size-fit medium:block rounded-full cursor-pointer flex-shrink-0">
                <Link href={`/${locale}/profile/${user.id}`}>
                  <Image
                    className="rounded-full border"
                    src={user?.image || "/Icons/noavatar.png"}
                    alt="avatar"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              <div className="w-full flex flex-col justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Link href={`/${locale}/profile/${user.id}`}>
                    <h1 className="font-bold text-xl hover:underline cursor-pointer">
                      {user?.name}
                    </h1>
                  </Link>
                  {user.isPlusPack && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="border size-fit rounded-lg p-2 border-yellow-500">
                          <Trophy className="text-yellow-400" size={20} />
                        </TooltipTrigger>
                        <TooltipContent>{t("PlusMember")}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <div>
                  <TextareaAutosize
                    readOnly
                    maxRows={2}
                    defaultValue={user.description}
                    className="w-full border bg-transparent rounded-lg p-2"
                  />
                </div>
                <div className="grid grid-cols-2 md:flex sm:grid sm:grid-cols-2 gap-2">
                  <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
                    {t("Combos")} {user?.Combo.length}
                  </span>
                  <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
                    {t2("Comments")}: {user?.comments.length}
                  </span>
                  <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
                    {t("TotalLikes")}{" "}
                    {user.Combo.find((combo) => combo)?.likes.length}
                  </span>
                  <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
                    {t("TotalFavorites")}{" "}
                    {user.Combo.find((combo) => combo)?.favorites.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}
