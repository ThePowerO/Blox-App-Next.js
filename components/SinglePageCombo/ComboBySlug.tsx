import Image from "next/image";
import React from "react";
import { HoverComboAuthor } from "../HtmlComponents/HoverComboAuthor";
import FavortiteLikeBtn from "./FavortiteLikeBtn";
import { Combo } from "@/lib/types";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { Textarea } from "@/components/ui/textarea";
import {
  DifficultyBadge,
  RaceBadge,
  SpecialtyBadge,
  StatsBadge,
} from "../HtmlComponents/ComboBadges";
import ComboVideo from "../HtmlComponents/ComboVideo";
import { Separator } from "../ui/separator";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Props = {
  combo: Combo;
};


export default async function ComboBySlug({ combo }: Props) {

  const session: any = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
    select: {
      email: true,
      id: true,
      name: true,
      image: true,
      createdAt: true,
      favorites: {
        where: {
          user: {
            email: session?.user?.email
          }
        }
      },
      commentLikes: {
        where: {
          user: {
            email: session?.user?.email
          }
        }
      }
    }
  })

  return (
    <section className="w-full grid grid-cols-1 gap-2 p-2">
      <div className="flex items-center w-full gap-2 border rounded-[8px] p-2">
        <h1 className="text-[12px]">
          You are viewing the combo{" "}
          <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent">
            {combo.combotitle}
          </span>
        </h1>
      </div>
      <div className="flex petit:justify-center w-full gap-2">
        <Image
          fetchPriority="high"
          src={combo.fightingstyle}
          className="border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px]"
          alt=""
          width={60}
          height={60}
        />
        <Image
          fetchPriority="high"
          src={combo.fruit}
          className="border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px]"
          alt=""
          width={60}
          height={60}
        />
        <Image
          fetchPriority="high"
          src={combo.sword}
          className="border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px]"
          alt=""
          width={60}
          height={60}
        />
        <Image
          fetchPriority="high"
          src={combo.weapon}
          className="border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px]"
          alt=""
          width={60}
          height={60}
        />
      </div>
      <div className="flex items-center justify-between sm:justify-normal w-full gap-1">
        <div className="">
          built by
          <HoverComboAuthor
            authorCreatedAt={combo.authorCreatedAt}
            comboAuthor={combo.author}
            authorImage={combo.authorImage}
          />
        </div>
        <FavortiteLikeBtn
          combo={combo}
          comboId={combo.id}
          likeId={combo.likes?.find((like) => like.userId === session?.user?.id)?.comboId as string}
          isInLikeList={!!combo.likes?.find((like) => like.userId === session?.user?.id)}
          isInFavoriteList={!!combo.favorites?.find((like) => like.userId === session?.user?.id)}
          favoriteId={combo.favorites?.find((like) => like.userId === session?.user?.id)?.id}
          userId={session?.user?.id}
          pathName={""}
          userEmail={user?.email}
        />
      </div>
      <Textarea className="h-[120px]" readOnly value={combo.combodescription} />
      <h2 className="font-bold">Combo Properties:</h2>
      <div className="flex gap-2">
        <SpecialtyBadge specialty={combo.specialty} />
        <RaceBadge race={combo.race} />
        <StatsBadge stats={combo.mainStats} />
        <DifficultyBadge difficulty={combo.difficulty} />
      </div>
      <ComboVideo comboVideo={combo.comboVideo} />
      <Separator className="text-black sm:hidden mt-2" />
    </section>
  );
}
