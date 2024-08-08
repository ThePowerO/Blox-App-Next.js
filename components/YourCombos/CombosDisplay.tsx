"use client";

import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLocale } from "@/LocaleContext";
import { Combo, CommentCBDisplay, User as UserLib } from "@/lib/types";
import { User } from "@prisma/client";
import { Input } from "../ui/input";
import ComboFilter from "./ComboFilter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Search } from "lucide-react";
import TextAreaAutosize from "react-textarea-autosize";
import ComboCard from "./ComboCard";
import { useTranslations } from "next-intl";

type Props = {
  comboData: Combo[];
  user: UserLib;
  isProfilePage: boolean;
  isCombosPage: boolean;
  ParamsUserId: string;
};

export default function CombosDisplay({
  comboData,
  user,
  isProfilePage,
  isCombosPage,
  ParamsUserId,
}: Props) {
  const pathName = usePathname();

  const t = useTranslations("YourCombos");
  const initialCombosDisplay = isProfilePage === true ? 4 : 6;
  const incrementCombosDisplay = isProfilePage === true ? 6 : 10;
  const [displayCombos, setDisplayCombos] = useState(initialCombosDisplay);

  const [searchValue, setSearchValue] = useState("");
  const SearchParams = useSearchParams();
  const selectedFilter = SearchParams.get("filter");

  const [fightingStyleFilter, setFightingStyleFilter] = useState<string[]>([]);
  const [fruitFilter, setFruitFilter] = useState<string[]>([]);
  const [swordFilter, setSwordFilter] = useState<string[]>([]);
  const [weaponFilter, setWeaponFilter] = useState<string[]>([]);

  const { locale } = useLocale();

  const { data: session } = useSession();
  const currentUser = session?.user;

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
    .filter((combo) => {
      if (selectedFilter === t("Highlighted")) {
        return combo.highlight === "HIGHLIGHTED"; // Only display highlighted combos
      } else if (selectedFilter === "Relevant") {
        return combo.highlight === "HIGHLIGHTED";
      } else {
        return true; // No filtering for other filters
      }
    })
    .sort((a, b) => {
      if (selectedFilter === t("Recent")) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (selectedFilter === t("Old")) {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (selectedFilter === t("Likes")) {
        return b.likes.length - a.likes.length;
      } else if (selectedFilter === "TopCombos") {
        return b.likes.length - a.likes.length;
      } else if (selectedFilter === t("Favorites")) {
        return b.favorites.length - a.favorites.length;
      } else {
        return 0; // No sorting for default case
      }
    });

  const router = useRouter();

  const loadMore = () => {
    setDisplayCombos(displayCombos + incrementCombosDisplay);
  };

  return (
    <>
      {isProfilePage === false && (
        <section className="mb-6">
          <Input
            placeholder={`${t("searchPlaceholder")}`}
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
      )}
      {isProfilePage === true && selectedFilter === "TopComments" ? (
        <section className="flex flex-col gap-4 pt-8">
          {user.comments.map((comment) => (
            <>
              <div
                className="flex flex-col border rounded-lg p-2"
                key={comment.id}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h2 className="underline">@{comment.user?.name}</h2>
                    <Heart size={16} color="red" />
                    <span>{comment.likes.length}</span>
                  </div>
                  <Button
                    variant={"link"}
                    className="text-blue-500"
                    onClick={() => router.push(`/${locale}/combos/${(comment as CommentCBDisplay).combo.slug}`)}
                  >
                    Go to Combo <ArrowRight size={16} />
                  </Button>
                </div>
                <TextAreaAutosize value={comment.text} readOnly maxRows={6} />
              </div>
            </>
          ))}
        </section>
      ) : (
        <section>
          {isProfilePage === true && (
            <div className="relative">
              <input
                placeholder={`${t("searchPlaceholder")}`}
                className="mt-8 p-3 pl-7 w-full border rounded-lg first-letter:border bg-white text-sm 
                font-medium text-gray-900 placeholder-gray-400 focus:ring-0 dark:bg-[#212529] dark:text-white"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search
                className="absolute left-[6px] top-[45px] z-10"
                size={20}
              />
            </div>
          )}
          <div
            className={`${
              isProfilePage === true
                ? "pt-8 flex flex-col gap-x-2 lg:grid lg:grid-cols-2 gap-y-4"
                : "flex flex-col gap-x-2 850px:grid 850px:grid-cols-2 gap-y-4"
            }`}
          >
            {filteredCombos.slice(0, displayCombos).map((combo) => (
              <ComboCard
                isCombosPage={isCombosPage}
                key={combo.id}
                combo={combo}
                ParamsUserId={ParamsUserId}
                isProfilePage={isProfilePage}
                user={user as any}
              />
            ))}
            {displayCombos < filteredCombos.length ? (
              <Button className="mt-3 col-span-2" onClick={loadMore}>
                {t("LoadMore")}
              </Button>
            ) : null}
          </div>
        </section>
      )}
    </>
  );
}
