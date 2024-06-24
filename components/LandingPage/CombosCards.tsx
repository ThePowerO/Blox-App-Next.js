"use client";

import { Combo } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MoreHorizontalBtn from "../HtmlComponents/MoreHorizontal";
import FavortiteLikeBtn from "../SinglePageCombo/FavortiteLikeBtn";
import { usePathname } from "next/navigation";
import { useLocale } from "@/LocaleContext";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Heart, Star } from "lucide-react";
import AddLikeButton, { AddFavoriteButton, AddLikeParagraph } from "../HtmlComponents/SubmitButtons";
import NoSessionLikeFav from "../HtmlComponents/NoSessionLikeFav";
import { AvatarDemo } from "../HtmlComponents/AvatarDemo";

export default function CombosCards({
  CommunityCombos,
}: {
  CommunityCombos: Combo[];
}) {
  const { data: session } = useSession();
  const currentUser = session?.user as User;

  const { locale } = useLocale();
  const pathName = usePathname();

  return (
    <div className="slider" style={{
      '--height': `182px`,
      '--width': `500px`,
      '--quantity': `${CommunityCombos?.length}`,
    } as React.CSSProperties}>
      <div className="list">
        {CommunityCombos?.length === 0 && <p>no combos</p>}
        {CommunityCombos?.map((combo, index) => (
          <article
            style={{ "--position": `${index}` } as React.CSSProperties}
            key={combo.id}
            className="item flex cursor-pointer petit:h-[140px] medium:h-[182px] border transition hover:shadow-xl"
          >
            <div className="hidden tiny:block rotate-180 [writing-mode:_vertical-lr]">
              <time
                dateTime={combo.createdAt.toISOString()}
                className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900 dark:text-white"
              >
                <span>{combo.createdAt.toLocaleDateString()}</span>
                <span className="w-px flex-1 bg-gray-900/10 dark:bg-white"></span>
                <span>{""}</span>
              </time>
            </div>
            <div className="grid grid-cols-2">
              {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon].map(
                (src, index) => (
                  <Image
                    key={index}
                    fetchPriority="high"
                    src={src}
                    className="aspect-square border h-[90px] w-[90px] object-cover"
                    alt={"combo img"}
                    width={70}
                    height={70}
                  />
                )
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="border-s border-gray-900/10 p-2 sm:border-l-transparent sm:p-2">
                <Link href={`/${locale}/combos/${combo.slug}`}>
                  <h3 className="font-bold tinymax420px:line-clamp-1 hover:underline uppercase text-gray-900 dark:text-white">
                    {combo.combotitle}
                  </h3>
                </Link>
                <p className="mt-2 line-clamp-3 petit:line-clamp-1 tinymax:line-clamp-1 tiny:line-clamp-2 sm:line-clamp-1 md:line-clamp-3 text-sm/relaxed text-gray-700 dark:text-white">
                  {combo.combodescription}
                </p>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full medium:items-end medium:justify-end">
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex gap-2 flex-1 ml-2"
                  >
                    {currentUser?.id ? (
                      <FavortiteLikeBtn
                        editCombo={false}
                        combo={combo}
                        comboId={combo.id}
                        likeId={
                          combo.likes?.find((like) => like.userId === currentUser?.id)
                            ?.id
                        }
                        isInLikeList={
                          !!combo.likes?.find(
                            (like) => like.userId === currentUser?.id
                          )
                        }
                        isInFavoriteList={
                          !!combo.favorites?.find(
                            (like) => like.userId === currentUser?.id
                          )
                        }
                        favoriteId={
                          combo.favorites?.find(
                            (like) => like.userId === currentUser?.id
                          )?.id
                        }
                        userId={currentUser?.id}
                        pathName={pathName}
                        userEmail={currentUser?.email}
                      />
                    ): (
                      <div className="flex items-center gap-1">
                        <NoSessionLikeFav />
                        <AddLikeParagraph combo={combo} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between ml-2 mt-2">
                  <div className="flex gap-2 items-center">
                    <AvatarDemo
                      userImg={combo.user.image || ""}
                      userNickName={combo.user.name || ""}
                    />
                    <span className="hover:underline">@{combo.user.name}</span>
                  </div>
                  <Link
                    href={`/${locale}/combos/${combo.slug}`}
                    className="bg-cyan-500 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-cyan-600"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
