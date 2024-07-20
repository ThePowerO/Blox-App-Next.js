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

type Props = {
  ParamsUserId: string;
};

export default async function UserMainContent({ ParamsUserId }: Props) {
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
        <div className="flex justify-center mb-2">
          <div className="medium:hidden size-fit relative group rounded-full cursor-pointer flex-shrink-0">
            <Image
              className="rounded-full border"
              src={user?.image || "/Icons/noavatar.png"}
              alt="avatar"
              width={130}
              height={130}
            />
            <div className="object-cover top-0 rounded-full absolute hidden group-hover:block size-full bg-black/10"></div>
            <div className="absolute top-[50px] hidden group-hover:block left-[45px]">
              <Pencil size={40} />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="hidden medium:block relative group rounded-full cursor-pointer flex-shrink-0">
            <Image
              className="rounded-full border"
              src={user?.image || "/Icons/noavatar.png"}
              alt="avatar"
              width={130}
              height={130}
            />
            <div className="object-cover top-0 rounded-full absolute hidden group-hover:block size-full bg-black/10"></div>
            <div className="absolute top-[50px] hidden group-hover:block left-[45px]">
              <Pencil size={40} />
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-xl">{user?.name}</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="border size-fit rounded-lg p-2 border-yellow-500">
                    <Trophy className="text-yellow-400" size={20} />
                  </TooltipTrigger>
                  <TooltipContent>
                    This user is a Plus Member and so can receive extra rewards.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. A,
                minus.
              </p>
            </div>
            <div className="grid grid-cols-2 md:flex sm:grid sm:grid-cols-2 gap-2">
              <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
                Combos: {user?.Combo.length}
              </span>
              <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
                Comments: {user?.comments.length}
              </span>
              <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
                Total Likes: {combo.reduce((a, b) => a + b.likes.length, 0)}
              </span>
              <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
                Total Favorites:{" "}
                {combo.reduce((a, b) => a + b.favorites.length, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
