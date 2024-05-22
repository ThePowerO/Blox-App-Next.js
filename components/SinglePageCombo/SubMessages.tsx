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

type Props = {
  comment: Comment;
};

export default function SubMessages({ comment }: Props) {
  const [showMore, setShowMore] = useState(false);
  const { data: session } = useSession();
  const currentUser = session?.user as User;
  const pathName = usePathname();

  const replies = comment.replies as Replies[];

  return (
    <div className="relative">
      <Button
        onClick={() => setShowMore((prev) => !prev)}
        variant="link"
        className={`absolute rounded-lg ${currentUser.id === comment.user.id ? "top-[-30px] petit:top-[-30px]" : "top-[-25px]" } left-[50px] petit:left-[170px] flex p-0 items-center gap-1 w-fit h-[30px] ${
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
                  <Link
                    scroll={false}
                    href={"#"}
                    className="cursor-pointer h-fit rounded-full border border-black"
                  >
                    <AvatarDemo
                      className=""
                      userImg={reply.user.image}
                      userNickName={reply.user.name}
                    />
                  </Link>
                  <span className="petit:hidden cursor-pointer w-fit underline text-sm font-bold">
                    {reply.user.name}
                  </span>
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
                  <span className="hidden cursor-pointer w-fit petit:block underline text-sm font-bold">
                    {reply.user.name}
                  </span>
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
