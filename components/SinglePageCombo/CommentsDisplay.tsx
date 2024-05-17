'use client';

import { Comment } from "@/lib/types";
import React, { useState } from "react";
import { AvatarDemo } from "../HtmlComponents/AvatarDemo";
import { Link } from "@/navigation";
import CommentText from "./CommentText";

type Props = {
  comments: Comment[];
  userId: string;
};

export default function CommentsDisplay({ comments, userId }: Props) {
  return (
    <>
      {comments.length === 0? (
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
              <div className="flex flex-col justify-between text-sm w-full">
                <span className="text-sm font-bold">{comment.user.name}</span>
                <CommentText userId={userId} comment={comment} />
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
