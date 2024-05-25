"use client";

import { Comment, Replies } from "@/lib/types";
import React, { useState } from "react";
import { AvatarDemo } from "../HtmlComponents/AvatarDemo";
import { Link } from "@/navigation";
import CommentText from "./CommentText";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import {
  AddCommentLkeBtn,
  RemoveCommentLikeBtn,
} from "../HtmlComponents/SubmitButtons";
import {
  LikeComment,
  UnlikeComment,
} from "@/lib/actions/commentActions";
import SubMessages from "./SubMessages";
import { HoverCommentAuthor } from "../HtmlComponents/HoverComboAuthor";
import { formatDistanceToNow } from "date-fns";
import { de } from 'date-fns/locale';
import { ja } from 'date-fns/locale';
import { fr } from 'date-fns/locale';
import { ko } from 'date-fns/locale';
import { it } from 'date-fns/locale';
import { zhCN } from 'date-fns/locale';
import { ptBR } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';
import { useLocale } from "@/LocaleContext"; 

const locales = {
  en: enUS,
  ja: ja,
  fr: fr,
  de: de,
  ko: ko,
  it: it,
  zhCN: zhCN,
  ptBR: ptBR
};

function getLocale(locale: string) {
  switch (locale) {
    case "en":
      return locales.en;
    case "jp":
      return locales.ja;
    case "fr":
      return locales.fr;
    case "de":
      return locales.de;
    case "kr":
      return locales.ko;
    case "it":
      return locales.it;
    case "cn":
      return locales.zhCN;
    case "pt":
      return locales.ptBR;
    default:
      return locales.en;
  }
}

type Props = {
  comments: Comment[];
  userId: string;
};

export default function CommentsDisplay({ comments, userId }: Props) {
  const pathName = usePathname();
  const { data: session } = useSession();
  const currentUser = session?.user as User;
  const { locale } = useLocale();
  const SearchParams = useSearchParams();
  const selectedFilter = SearchParams.get("filter");

  const filteredComments = comments.sort((a, b) => {
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
      {comments.length === 0 ? (
        <div className="w-full border rounded-lg p-4 mt-[45px] flex justify-center">
          <h1 className="text-bold place-self-center">No comments to show.</h1>
        </div>
      ) : (
        filteredComments.map((comment) => (
          <div
            key={comment.id}
            className="p-2 mt-[15px] w-full border rounded-lg"
          >
            <div className="flex gap-2 petitmax:flex-col items-start">
              <div className="flex gap-2 petitmax:w-full">
                <HoverCommentAuthor
                  authorCreatedAt={comment.user.createdAt}
                  authorImage={comment.user.image as string}
                  commentAuthor={comment.user.name as string}
                />
                <div className="flex flex-col">
                  <span className="petit:hidden cursor-pointer w-fit underline text-sm font-bold">
                    {comment.user.name}
                  </span>
                  <span className="w-fit petit:hidden text-[13px] dark:text-gray-400 text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: getLocale(locale) })}
                  </span>
                </div>
                <div className="petit:order-first petit:items-center flex justify-end w-full">
                  {!!comment.likes?.find(
                    (like) => like.userId === currentUser.id
                  ) ? (
                    <form action={UnlikeComment}>
                      <input
                        type="hidden"
                        name="commentId"
                        value={comment.id}
                      />
                      <input type="hidden" name="pathName" value={pathName} />
                      <RemoveCommentLikeBtn {...comment} />
                    </form>
                  ) : (
                    <form action={LikeComment}>
                      <input
                        type="hidden"
                        name="commentId"
                        value={comment.id}
                      />
                      <input type="hidden" name="pathName" value={pathName} />
                      <AddCommentLkeBtn {...comment} />
                    </form>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between text-sm w-full">
                <div className="flex items-center gap-1">
                  <span className="hidden cursor-pointer w-fit petit:block underline text-sm font-bold">
                    {comment.user.name}
                  </span>
                  <span className="hidden  w-fit petit:block text-[13px] dark:text-gray-400 text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true, locale: getLocale(locale) })}
                  </span>
                </div>
                <CommentText userId={userId} comment={comment} />
              </div>
            </div>
            <SubMessages comment={comment} />
          </div>
        ))
      )}
    </>
  );
}
