import Image from "next/image";
import React from "react";
import { HoverComboAuthor } from "../HtmlComponents/HoverComboAuthor";
import { Combo } from "@/lib/types";
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
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";
import AddLikeButton, { AddFavoriteButton, AddLikeParagraph } from "../HtmlComponents/SubmitButtons";
import NoSessionLikeFav from "../HtmlComponents/NoSessionLikeFav";
import { useTranslations } from "next-intl";
import FavortiteLikeBtn from "./FavortiteLikeBtn";

type Props = {
  combo: Combo;
};


export default async function ComboBySlug({ combo }: Props) {

  const t = useTranslations("ComboBySlug")
  
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;

  return (
    <>
      <section className="hidden sm:block w-full p-4 rounded-lg">
        <header className="flex items-center justify-between border-b pb-2 mb-4">
          <h1 className="text-lg font-semibold">
            {t("ViewingCombo")}{" "}
            <span className="text-gradient bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {combo.combotitle}
            </span>
          </h1>
          {currentUser ? (
            <FavortiteLikeBtn
              editCombo={true}
              combo={combo}
              comboId={combo.id}
              likeId={
                combo.likes?.find((like) => like.userId === currentUser?.id)
                  ?.comboId
              }
              isInLikeList={
                !!combo.likes?.find((like) => like.userId === currentUser?.id)
              }
              isInFavoriteList={
                !!combo.favorites?.find(
                  (like) => like.userId === currentUser?.id
                )
              }
              favoriteId={
                combo.favorites?.find((like) => like.userId === currentUser?.id)
                  ?.id
              }
              userId={currentUser?.id}
              pathName={""}
              userEmail={currentUser?.email}
            />
          ) : (
            <div className="flex gap-1">
              <NoSessionLikeFav />
              <AddLikeParagraph combo={combo} />
            </div>
          )}
        </header>

        <div className="flex flex-col sm:items-center sm:flex-row gap-4 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon].map(
              (src, index) => (
                <Image
                  key={index}
                  fetchPriority="high"
                  src={src}
                  className="border rounded-md w-full"
                  alt="combo image"
                  width={140}
                  height={140}
                />
              )
            )}
          </div>
          <Textarea
            className="h-[140px] w-full resize-none"
            readOnly
            value={combo.combodescription}
          />
        </div>

        <div className="mb-4">
          <h2 className="font-bold mb-2">{t("ComboProperties")}</h2>
          <div className="flex gap-2">
            <SpecialtyBadge specialty={combo.specialty} />
            <RaceBadge race={combo.race} />
            <StatsBadge stats={combo.mainStats} />
            <DifficultyBadge difficulty={combo.difficulty} />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            {t("BuiltBy")}{" "}
            <HoverComboAuthor
              authorCreatedAt={combo.user.createdAt}
              comboAuthor={combo.user.name || ""}
              authorImage={combo.user.image || ""}
            />
          </div>
        </div>

        <div>
          <ComboVideo comboVideo={combo.comboVideo} />
        </div>

        <Separator className="text-black mt-4" />
      </section>
      <section className="sm:hidden w-full grid grid-cols-1 gap-2 p-2">
        <div className="flex items-center w-full gap-2 border rounded-[8px] p-2">
          <h1 className="text-[12px]">
            {t("ViewingCombo")}{" "}
            <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent">
              {combo.combotitle}
            </span>
          </h1>
        </div>
        <div className="flex petit:justify-center w-full gap-2">
          {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon].map(
            (src, index) => (
              <Image
                key={index}
                fetchPriority="high"
                src={src}
                className="border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px]"
                alt="combo image"
                width={60}
                height={60}
              />
            )
          )}
        </div>
        <div className="flex items-center justify-between sm:justify-normal w-full gap-1">
          <div className="">
            built by
            <HoverComboAuthor
              authorCreatedAt={combo.user.createdAt}
              comboAuthor={combo.user.name || ""}
              authorImage={combo.user.image || ""}
            />
          </div>
          {currentUser ? (
            <FavortiteLikeBtn
              editCombo={true}
              combo={combo}
              comboId={combo.id}
              likeId={
                combo.likes?.find((like) => like.userId === currentUser?.id)
                  ?.comboId
              }
              isInLikeList={
                !!combo.likes?.find((like) => like.userId === currentUser?.id)
              }
              isInFavoriteList={
                !!combo.favorites?.find((like) => like.userId === currentUser?.id)}
              favoriteId={
                combo.favorites?.find((like) => like.userId === currentUser?.id)?.id
              }
              userId={currentUser?.id}
              pathName={""}
              userEmail={currentUser?.email}
            />
          ) : (
            <div className="flex gap-1">
              <NoSessionLikeFav />
              <AddLikeParagraph combo={combo} />
            </div>
          )}
        </div>
        <Textarea
          className="h-[120px]"
          readOnly
          value={combo.combodescription}
        />
        <h2 className="font-bold">{t("ComboProperties")}</h2>
        <div className="flex gap-2">
          <SpecialtyBadge specialty={combo.specialty} />
          <RaceBadge race={combo.race} />
          <StatsBadge stats={combo.mainStats} />
          <DifficultyBadge difficulty={combo.difficulty} />
        </div>
        <ComboVideo comboVideo={combo.comboVideo} />
        <Separator className="text-black mt-2" />
      </section>
    </>
  );
}