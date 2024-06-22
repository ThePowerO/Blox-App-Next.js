"use client";

import Image from "next/image";
import React, { useState } from "react";
import MoreHorizontalBtn from "../HtmlComponents/MoreHorizontal";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import FavortiteLikeBtn from "../SinglePageCombo/FavortiteLikeBtn";
import { Combo } from "@/lib/types";
import { useLocale } from "@/LocaleContext";
import { AlertDestructive } from "../HtmlComponents/ErrorAlert";
import { Input } from "../ui/input";
import ComboFilter from "./ComboFilter";

export default function CombosDisplay({ comboData }: { comboData: Combo[] }) {
  const pathName = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const SearchParams = useSearchParams();
  const selectedFilter = SearchParams.get("filter");

  const [fightingStyleFilter, setFightingStyleFilter] = useState<string[]>([]);
  const [fruitFilter, setFruitFilter] = useState<string[]>([]);
  const [swordFilter, setSwordFilter] = useState<string[]>([]);
  const [weaponFilter, setWeaponFilter] = useState<string[]>([]);

  const { locale } = useLocale();

  const { data: session } = useSession();
  const currentUser = session?.user as User;

  const filteredCombos = comboData
    .filter((combo) =>
      combo.combotitle.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter((combo) => {
      if (weaponFilter.length === 0) {
        return true;
      } else {
        // weapon filter matches the combo's weapon
        return weaponFilter.some((filter) =>
          combo.weapon.toLowerCase().includes(filter.toLowerCase())
        );
      }
    })
    .filter((combo) => {
      if (fightingStyleFilter.length === 0) {
        return true;
      } else {
        // fightingstyle filter matches the combo's fightingstyle
        return fightingStyleFilter.some((filter) =>
          combo.fightingstyle.toLowerCase().includes(filter.toLowerCase())
        );
      }
    })
    .filter((combo) => {
      if (fruitFilter.length === 0) {
        return true;
      } else {
        // fruit filter matches the combo's fruit
        return fruitFilter.some((filter) =>
          combo.fruit.toLowerCase().includes(filter.toLowerCase())
        );
      }
    })
    .filter((combo) => {
      if (swordFilter.length === 0) {
        return true;
      } else {
        // sword filter matches the combo's sword
        return swordFilter.some((filter) =>
          combo.sword.toLowerCase().includes(filter.toLowerCase())
        );
      }
    })
    .sort((a, b) => {
      if (selectedFilter === "Recent") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (selectedFilter === "Old") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (selectedFilter === "Likes") {
        return b.likes.length - a.likes.length; // Sort by likes in descending order
      } else if (selectedFilter === "Favorite") {
        return b.favorites.length - a.favorites.length; // Sort by favorites in descending order
      } else {
        return 0; // No sorting for default case
      }
    });

  return (
    <>
      <section className="mb-6">
        <Input
          placeholder="Search Combos"
          className="w-full first-letter:border bg-white px-2 py-1.5 text-sm font-medium text-gray-900 placeholder-gray-400 focus:ring-0 dark:bg-[#212529] dark:text-white"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ComboFilter
          fightingStyleFilter={fightingStyleFilter}
          setFightingStyleFilter={setFightingStyleFilter}
          fruitFilter={fruitFilter}
          setFruitFilter={setFruitFilter}
          swordFilter={swordFilter}
          setSwordFilter={setSwordFilter}
          weaponFilter={weaponFilter}
          setWeaponFilter={setWeaponFilter}
        />
      </section>
      <section className="flex flex-col gap-x-2 850px:grid 850px:grid-cols-2 gap-y-4">
        {filteredCombos.map((combo) => (
          <Link
            href={`/${locale}/combos/${combo.slug}`}
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
            <div className="grid grid-cols-2 sm:hidden">
              {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon,].map((src, index) => (
                <Image
                  key={index}
                  fetchPriority="high"
                  src={src}
                  className="border h-full w-[60px] medium:h-full medium:w-[90px] object-cover"
                  alt={"combo img"}
                  width={50}
                  height={50}
                />
              ))}
            </div>
            <div className="hidden sm:grid sm:grid-cols-2">
              {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon,].map((src, index) => (
                <Image
                  key={index}
                  fetchPriority="high"
                  src={src}
                  className="aspect-square border medium:h-[90px] medium:w-[90px] object-cover"
                  alt={"combo img"}
                  width={70}
                  height={70}
                />
              ))}
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
              <div className="flex w-full medium:items-end medium:justify-end">
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex gap-2 flex-1 ml-2"
                >
                  {currentUser.id === combo.userId ? (
                    <MoreHorizontalBtn comboId={combo.id} pathName={""} />
                  ) : null}
                  <FavortiteLikeBtn
                    editCombo={false}
                    combo={combo}
                    comboId={combo.id}
                    likeId={
                      combo.likes?.find(
                        (like) => like.userId === currentUser.id
                      )?.id
                    }
                    isInLikeList={
                      !!combo.likes?.find(
                        (like) => like.userId === currentUser.id
                      )
                    }
                    isInFavoriteList={
                      !!combo.favorites?.find(
                        (like) => like.userId === currentUser.id
                      )
                    }
                    favoriteId={
                      combo.favorites?.find(
                        (like) => like.userId === currentUser.id
                      )?.id
                    }
                    userId={currentUser.id}
                    pathName={pathName}
                    userEmail={currentUser.email}
                  />
                </div>
                <Link
                  href={`/${locale}/combos/${combo.slug}`}
                  className="hidden petit:block  bg-cyan-500 p-2 tiny:px-5 tiny:py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-cyan-600"
                >
                  View More
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
