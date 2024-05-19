"use client";

import { Comment } from "@/lib/types";
import React, { useState } from "react";
import { AvatarDemo } from "../HtmlComponents/AvatarDemo";
import { Link } from "@/navigation";
import CommentText from "./CommentText";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { AddCommentLkeBtn, RemoveCommentLikeBtn } from "../HtmlComponents/SubmitButtons";
import { LikeCommentAction, UnlikeCommentAction } from "@/lib/actions/commentActions";

type Props = {
  comments: Comment[];
  userId: string;
};

export default function CommentsDisplay({ comments, userId }: Props) {
  const pathName = usePathname();
  const { data: session } = useSession();
  const currentUser = session?.user as User
  return (
    <>
      {comments.length === 0 ? (
        <div className="w-full border rounded-lg p-4 mt-[45px] flex justify-center">
          <h1 className="text-bold place-self-center">No comments to show.</h1>
        </div>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="p-2 mt-[15px] w-full border rounded-lg"
          >
            <div className="flex gap-2 petitmax:flex-col items-start">
              <div className="flex gap-2 petitmax:w-full">
                <Link
                  scroll={false}
                  href={"#"}
                  className="cursor-pointer h-fit rounded-full border border-black"
                >
                  <AvatarDemo
                    className=""
                    userImg={comment.user.image}
                    userNickName={comment.user.name}
                  />
                </Link>
                <span className="petit:hidden underline text-sm font-bold">
                  {comment.user.name}
                </span>
                <div className="petit:order-first petit:items-center flex justify-end w-full">
                  {!!comment.likes?.find((like) => like.userId === currentUser.id) ? (
                    <form action={UnlikeCommentAction}>
                      <input type="hidden" name="commentId" value={comment.id} />
                      <input type="hidden" name="pathName" value={pathName} />
                      <RemoveCommentLikeBtn {...comment} />
                    </form>
                  ) : (
                    <form action={LikeCommentAction}>
                      <input type="hidden" name="commentId" value={comment.id} />
                      <input type="hidden" name="pathName" value={pathName} />
                      <AddCommentLkeBtn {...comment} />
                    </form>
                  )}
                  
                </div>
              </div>
              <div className="flex flex-col justify-between text-sm w-full">
                <span className="hidden petit:block underline text-sm font-bold">
                  {comment.user.name}
                </span>
                <CommentText userId={userId} comment={comment} />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
