"use client";

import React, { useState } from "react";
import { MoreHorizontallBtn } from "../HtmlComponents/MoreVertical";
import { MoreHorizontalIcon, Reply } from "lucide-react";
import { Comment } from "@/lib/types";

type Props = {
  comment: Comment;
};

export default function CommentText({ comment }: Props) {
  const [fullComment, setFullComment] = useState(false);

  const hasNoSpaces = (text: string) => {
    return text && !/\s/.test(text);
  };

  return (
    <>
      {fullComment ? (
        <>
          <p className="petitmax:text-[13px] break-all">{comment.text}</p>
          <p
            className="cursor-pointer underline my-2"
            onClick={() => setFullComment(!fullComment)}
          >
            {`Show Less... >`}
          </p>
        </>
      ) : (
        <>
          {comment.text && comment.text.length < 429 ? (
            <p className="petitmax:text-[13px]">{comment.text}</p>
          ) : (
            <>
              <div className="w-full">
                {comment.text && (
                  <>
                    <p className={`${
                      hasNoSpaces(comment.text)
                        ? "break-all"
                        : "break-words"
                    } petitmax:text-[13px]`}
                    >
                      {comment.text.slice(0, 430)}...
                    </p>
                    <p
                      className="cursor-pointer underline my-2"
                      onClick={() => setFullComment(!fullComment)}
                    >{`Show More... >`}</p>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
      <div className="flex gap-2">
        <div className="cursor-pointer p-[2px] h-fit hover:bg-stone-200 dark:hover:bg-zinc-600 rounded-full">
          <Reply className="size-[16px]" />
        </div>
        <div className="cursor-pointer p-[2px] h-fit hover:bg-stone-200 dark:hover:bg-zinc-600 rounded-full">
          <MoreHorizontalIcon className="size-[16px]" />
        </div>
      </div>
    </>
  );
}
