"use client";

import { Comment, Replies } from "@/lib/types";
import Link from "next/link";
import React, { useState } from "react";
import { AvatarDemo } from "../HtmlComponents/AvatarDemo";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { usePathname } from "@/navigation";
import {  
  LikeReply,
  UnlikeReply,
} from "@/lib/actions/commentActions";
import {
  AddCommentLkeBtn,
  RemoveCommentLikeBtn,
} from "../HtmlComponents/SubmitButtons";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import CommentText from "./CommentText";
import ReplyText from "./ReplyText";
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
  comment: Comment;
};

export default function SubMessages({ comment }: Props) {
  const [showMore, setShowMore] = useState(false);
  const { data: session } = useSession();
  const currentUser = session?.user as User;
  const pathName = usePathname();
  const { locale } = useLocale();

  const replies = comment.replies as Replies[];

  return (
    <div className="relative">
      <Button
        onClick={() => setShowMore((prev) => !prev)}
        variant="link"
        className={`absolute rounded-lg
        ${currentUser.id === comment.user.id ? "top-[-30px] petit:top-[-30px]" : "top-[-25px]" }
        ${comment.userId === currentUser.id ? "left-[50px] petit:left-[170px]" : "left-[25px] petit:left-[140px]"} flex p-0 items-center gap-1 w-fit h-[30px] ${
          showMore && "underline"
        }`}
      >
        {replies.length ? (
          <>
            {showMore ? (
              <ChevronUp className="size-[16px]" />
            ) : (
              <ChevronDown className="size-[16px]" />
            )}
            {`View ${replies.length} replies`}
          </>
        ) : null}
      </Button>
      {showMore && (
        <div className="flex flex-col items-end">
          {replies.map((reply) => (
            <div className="p-2 mt-[15px] w-full sm:w-[95%] border rounded-lg">
              <div className="flex gap-2 petitmax:flex-col items-start">
                <div className="flex gap-2 petitmax:w-full">
                  <HoverCommentAuthor
                    authorCreatedAt={reply.user.createdAt}
                    authorImage={reply.user.image as string}
                    commentAuthor={reply.user.name || ""}
                  />
                  <div className="flex flex-col">
                    <span className="petit:hidden cursor-pointer w-fit underline text-sm font-bold">
                      {reply.user.name}
                    </span>
                    <span className="w-fit petit:hidden text-[13px] dark:text-gray-400 text-gray-500">
                      {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: getLocale(locale) })}
                    </span>
                  </div>
                  <div className="petit:order-first petit:items-center flex justify-end w-full">
                    {!!reply.likes?.find(
                      (like) => like.userId === currentUser.id
                    ) ? (
                      <form action={UnlikeReply}>
                        <input
                          type="hidden"
                          name="replyId"
                          value={reply.id}
                        />
                        <input type="hidden" name="pathName" value={pathName} />
                        <RemoveCommentLikeBtn {...reply} />
                      </form>
                    ) : (
                      <form action={LikeReply}>
                        <input
                          type="hidden"
                          name="replyId"
                          value={reply.id}
                        />
                        <input type="hidden" name="pathName" value={pathName} />
                        <AddCommentLkeBtn {...reply} />
                      </form>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between text-sm w-full">
                  <div className="flex items-center gap-1">
                    <span className="hidden cursor-pointer w-fit petit:block underline text-sm font-bold">
                      {reply.user.name}
                    </span>
                    <span className="hidden w-fit petit:block text-[13px] dark:text-gray-400 text-gray-500">
                      {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true, locale: getLocale(locale) })}
                    </span>
                  </div>
                  <span>
                    <ReplyText
                      userId={currentUser.id}
                      replies={reply}
                      comment={comment}
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
