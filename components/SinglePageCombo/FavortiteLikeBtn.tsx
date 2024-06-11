'use client'

import React from "react";
import AddLikeButton, { AddFavoriteButton, AddLikeParagraph, RemoveFavoriteButton, RemoveLikeButton, RemoveLikeParagraph } from "../HtmlComponents/SubmitButtons";
import { addComboLike, addComboFavorite, removeComboLike, removeComboFavorite } from "@/lib/actions/comboActions";
import { Combo } from "@/lib/types";
import { Pencil } from "lucide-react";
import { User } from "@prisma/client";
import Link from "next/link";
import { useLocale } from "@/LocaleContext";
import { useSession } from "next-auth/react";

type Props = {
  editCombo: boolean;
  combo: Combo;
  comboId: string;
  likeId: string | undefined;
  favoriteId: string | undefined;
  userId: string | undefined;
  userEmail: string | undefined | null;
  pathName: string;
  isInLikeList: boolean;
  isInFavoriteList: boolean;
}

export default function FavortiteLikeBtn({ combo, editCombo, comboId, likeId, favoriteId, userId, pathName, isInLikeList, isInFavoriteList }: Props) {

  const { data: session } = useSession();
  const currentUser = session?.user as User;
  const { locale } = useLocale();

  function formatNumber(num: number): string {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return (num / 1000000).toFixed(2) + 'm';
    }
  };

  const likes = 71687;

  return (
    <div className="justify-center">
      {session?.user && currentUser.id === userId && (
        <div className="flex items-center gap-[5px]">
          {editCombo && (
            <Link href={`/${locale}/edit-combo/${comboId}`} className="flex text-sm hover:underline cursor-pointer items-center gap-[5px] mr-[10px]">
              <Pencil width={15} height={15} />
              Edit Combo
            </Link>
          )}
          {isInFavoriteList ? (
            <form className="mt-1" action={removeComboFavorite}>
              <input type="hidden" name="pathName" value={pathName || ""} />
              <input type="hidden" name="favoriteId" value={favoriteId} />
              <RemoveFavoriteButton />
            </form>
          ) : (
            <form className="mt-1" action={addComboFavorite}>
              <input type="hidden" name="pathName" value={pathName || ""} />
              <input type="hidden" name="comboId" value={comboId} />
              <input type="hidden" name="userId" value={userId} />
              <AddFavoriteButton />
            </form>
          )}
          {isInLikeList ? (
            <form className="mt-1 flex gap-1" action={removeComboLike}>
              <input type="hidden" name="pathName" value={pathName || ""} />
              <input type="hidden" name="likeId" value={likeId} />
              <RemoveLikeButton />
              <RemoveLikeParagraph combo={combo} />
            </form>
          ) : (
            <form className="mt-1 flex gap-1" action={addComboLike}>
              <input type="hidden" name="pathName" value={pathName || ""} />
              <input type="hidden" name="comboId" value={comboId} />
              <input type="hidden" name="userId" value={currentUser.id} />
              <AddLikeButton />
              <AddLikeParagraph combo={combo} />
            </form>
          )}
        </div>
      )}
    </div>
  );
}