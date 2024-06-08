import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import CommentFilter from "../SinglePageCombo/CommentFilter";
import { Input } from "../ui/input";
import MoreHorizontalBtn from "../HtmlComponents/MoreHorizontal";
import CombosDisplay from "./CombosDisplay";
import { Combo } from "@/lib/types";

export default async function YourCombos() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;

  const comboData = await prisma.combo.findMany({
    where: {
      userId: currentUser.id,
    },
    include: {
      likes: true,
      comments: true,
    }
  });

  return (
    <div className=" p-4">
      <section className="mb-6">
        <Input
          placeholder="Search Combos"
          className="w-full  first-letter:border bg-white px-2 py-1.5 text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-0 dark:bg-[#212529] dark:text-white"
        />
        <CommentFilter />
      </section>
      <section className="flex flex-col gap-x-2 850px:grid 850px:grid-cols-2 gap-y-4">
        <CombosDisplay comboData={comboData as any} />
      </section>
    </div>
  );
}
