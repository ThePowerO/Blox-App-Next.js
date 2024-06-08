"use client";

import Image from "next/image";
import React from "react";
import MoreHorizontalBtn from "../HtmlComponents/MoreHorizontal";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Combo } from "@/lib/types";
import { Heart } from "lucide-react";
import AddLikeButton, { AddFavoriteButton, AddLikeParagraph, RemoveFavoriteButton, RemoveLikeButton, RemoveLikeParagraph } from "../HtmlComponents/SubmitButtons";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { addComboLike, addFavoriteCombo, removeComboLike, removeFavoriteCombo } from "@/lib/actions/comboActions";

export default function CombosDisplay({ comboData }: { comboData: Combo[] }) {
  const pathName = usePathname();
  const SearchParams = useSearchParams();
  const selectedFilter = SearchParams.get("filter");

  const { data: session } = useSession();
  const currentUser = session?.user as User;

  const filteredComboss = comboData.sort((a, b) => {
    if (selectedFilter === "Recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (selectedFilter === "Old") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (selectedFilter === "Top") {
      return b.likes.length - a.likes.length; // Sort by likes in descending order
    } else {
      return 0; // No sorting for default case
    }
  });

  return (
    <>
      {filteredComboss.map((combo) => (
        <article
          key={combo.id}
          className="flex cursor-pointer petit:h-[140px] medium:h-[182px] border transition hover:shadow-xl"
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
          <div className="hidden petit:grid petit:grid-cols-2 sm:hidden">
            {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon].map(
              (src, index) => (
                <Image
                  key={index}
                  fetchPriority="high"
                  src={src}
                  className="border h-full w-[60px] medium:h-full medium:w-[90px] object-cover"
                  alt={"combo img"}
                  width={50}
                  height={50}
                />
              )
            )}
          </div>
          <div className="hidden sm:grid sm:grid-cols-2">
            {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon].map(
              (src, index) => (
                <Image
                  key={index}
                  fetchPriority="high"
                  src={src}
                  className="aspect-square border medium:h-[90px] medium:w-[90px] object-cover"
                  alt={"combo img"}
                  width={70}
                  height={70}
                />
              )
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="border-s border-gray-900/10 p-2 sm:border-l-transparent sm:p-2">
              <Link href="#">
                <h3 className="font-bold hover:underline uppercase text-gray-900 dark:text-white">
                  {combo.combotitle}
                </h3>
              </Link>
              <p className="mt-2 line-clamp-3 petit:line-clamp-1 tinymax:line-clamp-1 tiny:line-clamp-2 sm:line-clamp-1 md:line-clamp-3 text-sm/relaxed text-gray-700 dark:text-white">
                {combo.combodescription}
              </p>
            </div>
            <div className="flex w-full medium:items-end medium:justify-end">
              <div className="hidden petit:flex gap-2 petit:flex-1 petit:ml-2">
                <MoreHorizontalBtn
                  comboId={combo.id}
                  comboSlug={combo.slug}
                  pathName={""}
                />
                <div className="justify-center">
                  {session?.user && currentUser.id && (
                    <div className="flex items-center gap-2">
                      {!!combo.favorites?.find(
                        (like) => like.userId === currentUser.id
                      ) ? (
                        <form className="mt-1" action={removeFavoriteCombo}>
                          <input
                            type="hidden"
                            name="pathName"
                            value={pathName}
                          />
                          <input
                            type="hidden"
                            name="favoriteId"
                            value={
                              combo.favorites?.find(
                                (like) => like.userId === currentUser.id
                              )?.id
                            }
                          />
                          <RemoveFavoriteButton />
                        </form>
                      ) : (
                        <form className="mt-1" action={addFavoriteCombo}>
                          <input
                            type="hidden"
                            name="pathName"
                            value={pathName}
                          />
                          <input
                            type="hidden"
                            name="comboId"
                            value={combo.id}
                          />
                          <AddFavoriteButton />
                        </form>
                      )}
                      {!!combo.likes?.find(
                        (like) => like.userId === currentUser.id
                      ) ? (
                        <form
                          className="mt-1 flex gap-1"
                          action={removeComboLike}
                        >
                          <input
                            type="hidden"
                            name="pathName"
                            value={pathName}
                          />
                          <input
                            type="hidden"
                            name="comboId"
                            value={
                              combo.likes?.find(
                                (like) => like.userId === currentUser.id
                              )?.comboId
                            }
                          />
                          <RemoveLikeButton />
                          <RemoveLikeParagraph combo={combo} />
                        </form>
                      ) : (
                        <form className="mt-1 flex gap-1" action={addComboLike}>
                          <input
                            type="hidden"
                            name="pathName"
                            value={pathName}
                          />
                          <input
                            type="hidden"
                            name="comboId"
                            value={combo.id}
                          />
                          <input
                            type="hidden"
                            name="userId"
                            value={currentUser.id}
                          />
                          <AddLikeButton />
                          <AddLikeParagraph combo={combo} />
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <a
                href="#"
                className="hidden medium:block  bg-cyan-500 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-cyan-600"
              >
                View More
              </a>
              <div className="flex w-full petit:hidden">
                {[
                  combo.fightingstyle,
                  combo.fruit,
                  combo.sword,
                  combo.weapon,
                ].map((src, index) => (
                  <Image
                    key={index}
                    fetchPriority="high"
                    src={src}
                    className="border"
                    alt={"combo img"}
                    width={60}
                    height={60}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="block petit:hidden">
            <MoreHorizontalBtn
              comboId={combo.id}
              comboSlug={combo.slug}
              pathName={""}
            />
          </div>
        </article>
      ))}
    </>
  );
}
