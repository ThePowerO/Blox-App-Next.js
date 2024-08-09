"use client";

import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import AddLikeButton, {
  AddFavoriteButton,
  AddLikeParagraph,
} from "../HtmlComponents/SubmitButtons";
import { User } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import MoreHorizontalBtn from "../HtmlComponents/MoreHorizontal";
import FavortiteLikeBtn from "../SinglePageCombo/FavortiteLikeBtn";
import { useSession } from "next-auth/react";
import { Combo } from "@/lib/types";
import { AvatarDemo } from "../HtmlComponents/AvatarDemo";
import NoSessionLikeFav from "../HtmlComponents/NoSessionLikeFav";

type Props = {
  combo: Combo;
  user: User;
  isProfilePage: boolean;
  isCombosPage: boolean;
  ParamsUserId: string;
};

export default function ComboCard({
  combo,
  user,
  isProfilePage,
  isCombosPage,
  ParamsUserId,
}: Props) {
  const t = useTranslations("YourCombos");
  const { data: session } = useSession();
  const currentUser = session?.user;

  const pathName = usePathname();
  const locale = useLocale();
  const router = useRouter();
  return (
    <article
      className={`petit:flex relative cursor-pointer petit:h-fit customtiny:h-fit 
        medium:h-[182px] border transition hover:shadow-xl
                    ${combo.highlight === `HIGHLIGHTED` ? "" : ""}
                  `}
    >
      {combo.highlight === `HIGHLIGHTED` && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute right-0 top-0">
                <Image
                  src={"/highlight-badge-2.png"}
                  className="hover:scale-110 transition-all rounded-full"
                  alt={""}
                  width={50}
                  height={50}
                />
                <TooltipContent align="end" className="">
                  <p className="">
                    This Combo is highlighted.
                    <br />
                    Highlighted Combos can receive extra benefits.
                    <br />
                    <Button
                      onClick={() => {
                        router.push(`/${locale}/`);
                        setTimeout(() => {
                          router.push(`/${locale}/#pricing-packs`);
                        }, 500);
                        const element =
                          document.getElementById("pricing-packs");
                        if (element) {
                          element.scrollIntoView({
                            behavior: "smooth",
                          });
                        }
                      }}
                      variant={"link"}
                      className="text-blue-500 text-[12px] p-0 gap-1"
                      type="button"
                    >
                      Learn More{" "}
                      <ArrowRight
                        className="text-blue-500"
                        width={18}
                        height={18}
                      />
                    </Button>
                  </p>
                </TooltipContent>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      )}
      <div className="hidden petit:block rotate-180 [writing-mode:_vertical-lr]">
        <time
          dateTime={combo.createdAt.toISOString()}
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900 dark:text-white"
        >
          <span>{combo.createdAt.toLocaleDateString()}</span>
          <span className="w-px flex-1 bg-gray-900/10 dark:bg-white"></span>
          <span>{""}</span>
        </time>
      </div>
      <Link
        href={`/${locale}/combos/${combo.slug}`}
        className="petitmax:flex customtiny:flex customtiny:flex-col size-fit medium:hidden"
      >
        {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon].map(
          (src, index) => (
            <Image
              key={index}
              fetchPriority="high"
              src={src}
              className="border size-fit medium:h-full medium:w-[90px] object-cover"
              alt={"combo img"}
              width={50}
              height={50}
            />
          )
        )}
      </Link>
      <Link
        href={`/${locale}/combos/${combo.slug}`}
        className="hidden medium:grid medium:grid-cols-2"
      >
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
      </Link>
      <div className="flex w-full flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-2 sm:border-l-transparent sm:p-2">
          <Link href={`/${locale}/combos/${combo.slug}`}>
            <h3
              className={`${
                isCombosPage === true
                  ? "line-clamp-2 medium:line-clamp-1"
                  : "tinymax420px:line-clamp-1"
              } font-bold
               hover:underline uppercase text-gray-900 dark:text-white`}
            >
              {combo.combotitle}
            </h3>
          </Link>
          <p
            className={` ${
              isCombosPage === true ? `line-clamp-4  ${combo.user.name?.length! > 10 ? "medium:line-clamp-1" : "medium:line-clamp-2"} ` : ""
            } ${isProfilePage === true ? ` ${combo.user.name?.length! > 10 ? "md:line-clamp-1" : "md:line-clamp-2"}` : ""}
            ${isCombosPage === false && isProfilePage === false ? `line-clamp-4 ${combo.user.name?.length! > 10 ? "medium:line-clamp-1" : "medium:line-clamp-2"}` 
            : ""} mt-2 
               
              text-sm/relaxed text-gray-700 dark:text-white`}
          >
            {combo.combodescription}
          </p>
        </div>
        {isCombosPage === true ? (
          <>
            <div className="flex flex-col">
              <div className="flex w-full medium:items-end medium:justify-end">
                <div className="flex gap-2 flex-1 ml-2">
                  {currentUser?.id === combo.userId ? (
                    <MoreHorizontalBtn
                      user={user}
                      combo={combo}
                      pathName={""}
                    />
                  ) : null}
                  {currentUser?.id ? (
                    <FavortiteLikeBtn
                      editCombo={false}
                      combo={combo}
                      comboId={combo.id}
                      likeId={
                        combo.likes?.find(
                          (like) => like.userId === currentUser?.id
                        )?.id
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
                  ) : (
                    <div className="flex items-center gap-1">
                      <NoSessionLikeFav />
                      <AddLikeParagraph combo={combo} />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between ml-2 mt-2">
                <Link
                  href={`/${locale}/profile/${combo.user?.id}`}
                  className="flex hover:underline cursor-pointer gap-2 items-center"
                >
                  <AvatarDemo
                    userImg={combo.user?.image}
                    userNickName={combo.user?.name}
                  />
                  <span className="">@{combo.user?.name}</span>
                </Link>
                <Link
                  href={`/${locale}/combos/${combo.slug}`}
                  className={`${
                    isProfilePage === true ? "lg:p-1" : ""
                  } bg-cyan-500 p-2 sm:px-5 sm:py-3 md:px-3 md:py-2 lg:px-5 lg:py-3 text-center text-xs
                    font-bold uppercase text-gray-900 transition hover:bg-cyan-600`}
                >
                  {t("ViewMore")}
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-full medium:items-end medium:justify-end">
            <div className="flex gap-2 flex-1 ml-2">
              {currentUser?.id === combo.userId ? (
                <MoreHorizontalBtn user={user} combo={combo} pathName={""} />
              ) : null}
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
              ) : (
                <div className="flex items-center gap-1">
                  <NoSessionLikeFav />
                  <AddLikeParagraph combo={combo} />
                </div>
              )}
            </div>
            <Link
              href={`/${locale}/combos/${combo.slug}`}
              className={`${
                isProfilePage === true ? "lg:p-1" : ""
              } hidden petit:block bg-cyan-500 p-2 tiny:px-5 tiny:py-3 text-center text-xs
                font-bold uppercase text-gray-900 transition hover:bg-cyan-600`}
            >
              {t("ViewMore")}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
