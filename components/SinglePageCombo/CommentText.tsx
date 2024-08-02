"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown, MoreHorizontal, Pencil, Reply } from "lucide-react";
import { Comment, Replies } from "@/lib/types";
import TextareaAutosize from "react-textarea-autosize";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { DeleteComment, UpdateCommentText } from "@/lib/actions/commentActions";
import { usePathname } from "next/navigation";
import { DeleteCommentBtn, SaveEditCommentBtn } from "../HtmlComponents/SubmitButtons";
import CommentReply from "./CommentReply";
import { useTranslations } from "next-intl";

type Props = {
  comment: Comment;
  userId: string;
};

export default function CommentText({ comment, userId }: Props) {
  const t = useTranslations("CommentText");
  const t2 = useTranslations("CommentSection")

  const [fullComment, setFullComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyUserName, setReplyUserName] = useState("" as string | null);
  const [textValue, setTextValue] = useState("");

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const toggleReplying = () => {
    setIsReplying((prev) => !prev);
  };

 const catchUserName = (userName: string | null) => {
   setReplyUserName(userName);
 }

  const pathName = usePathname();

  const hasNoSpaces = (text: string) => {
    return text && !/\s/.test(text);
  };

  const EditFormSchema = z.object({
    text: z
    .string()
    .min(1, {
      message: t2("CommentRequired"),
    })
  });

  type InputType = z.infer<typeof EditFormSchema>;

  const form = useForm<InputType>({
    resolver: zodResolver(EditFormSchema),
  });

  return (
    <>
      {isEditing ? (
        <Form {...form}>
          <form action={async (FormData) => {
            form.reset();
            setTextValue("");
            toggleEditing();
            await UpdateCommentText(FormData);
          }}>
            <input type="hidden" name="commentId" value={comment.id} />
            <input type="hidden" name="pathName" value={pathName} />
            <FormField
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextareaAutosize
                      {...field}
                      value={textValue}
                      autoFocus
                      required
                      onChange={(e) => {
                        setTextValue(e.target.value);
                      }}
                      minRows={1}
                      maxLength={4000}
                      className="w-full p-2 rounded-md focus:outline-none border focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end gap-2">
              <Button
                onClick={() => {
                  form.reset();
                  toggleEditing();
                }}
                variant="outline"
                className="rounded-lg w-fit h-[30px] dark:hover:bg-stone-800 hover:bg-stone-300"
              >
                <span>{t("Cancel")}</span>
              </Button>
              {textValue.trim() === comment.text || !textValue || textValue.trim() === "" ? (
                <div className="cursor-not-allowed">
                  <Button
                    disabled
                    type="button"
                    variant="outline"
                    className="rounded-lg w-fit h-[30px] bg-slate-300"
                  >
                    <span className="dark:text-black">{t("Save")}</span>
                  </Button>
                </div>
              ) : (
                <SaveEditCommentBtn />
              )}
            </div>
          </form>
        </Form>
      ) : (
        <div>
          {fullComment ? (
            <>
              <TextareaAutosize
                readOnly
                value={comment.text}
                className="petitmax:text-[13px] break-all w-full bg-transparent outline-none resize-none"
              />
              <p
                className="cursor-pointer underline my-2"
                onClick={() => setFullComment(!fullComment)}
              >
                {t("ShowLess")}
              </p>
            </>
          ) : (
            <>
              {comment.text && comment.text.length < 429 ? (
                <TextareaAutosize
                  readOnly
                  value={comment.text}
                  className="petitmax:text-[13px] w-full bg-transparent outline-none resize-none"
                />
              ) : (
                <>
                  <div className="w-full">
                    {comment.text && (
                      <>
                        <TextareaAutosize
                          readOnly
                          className={`${
                            hasNoSpaces(comment.text)
                              ? "break-all"
                              : "break-words"
                          } petitmax:text-[13px] w-full bg-transparent outline-none resize-none`}
                          value={comment.text.slice(0, 430)}
                        />
                        <p
                          className="cursor-pointer underline my-2"
                          onClick={() => setFullComment(!fullComment)}
                        >{t("ShowMore")}</p>
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
      {isReplying && (
        <CommentReply replyUserName={replyUserName} toggleReplying={toggleReplying} comment={comment as Comment} />
      )}
      <div className="flex gap-2">
        <div onClick={() => {
          toggleReplying();
          catchUserName(comment.user.name);
        }} className="cursor-pointer p-[2px] h-fit hover:bg-stone-200 dark:hover:bg-zinc-600 rounded-full">
          <Reply className="size-[16px]" />
        </div>
        {comment.user.id === userId && (
          <div className="cursor-pointer p-[2px] h-fit hover:bg-stone-200 dark:hover:bg-zinc-600 rounded-full">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="size-[16px]" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <div className="w-full">
                    <Button
                      onClick={() => {
                        setTextValue(comment.text);
                        form.reset();
                        toggleEditing();
                      }}
                      variant="outline"
                      className="flex w-full items-center gap-1"
                    >
                      <Pencil width={18} height={18} />
                      <span>{t("EditComment")}</span>
                    </Button>
                  </div>
                </DropdownMenuItem>
                <form
                  action={DeleteComment}
                  className="p-1"
                >
                  <input type="hidden" name="commentId" value={comment.id} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <DeleteCommentBtn />
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </>
  );
}
