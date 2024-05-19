"use client";

import React, { useState } from "react";
import { MoreHorizontal, Pencil, Reply } from "lucide-react";
import { Comment } from "@/lib/types";
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
import { DeleteCommentAction, UpdateCommentText } from "@/lib/actions/commentActions";
import { usePathname } from "next/navigation";
import { DeleteCommentBtn, SaveEditCommentBtn } from "../HtmlComponents/SubmitButtons";
import CommentReply from "./CommentReply";

type Props = {
  comment: Comment;
  userId: string;
};

export default function CommentText({ comment, userId }: Props) {
  const [fullComment, setFullComment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [textValue, setTextValue] = useState("");

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const toggleReplying = () => {
    setIsReplying((prev) => !prev);
  };

  const pathName = usePathname();

  const hasNoSpaces = (text: string) => {
    return text && !/\s/.test(text);
  };

  const EditFormSchema = z.object({
    text: z.string().min(1, {
      message: "Comment is required",
    }),
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
                className="rounded-lg w-[60px] h-[30px] dark:hover:bg-stone-800 hover:bg-stone-300"
              >
                <span>Cancel</span>
              </Button>
              {textValue === comment.text ? (
                <div className="cursor-not-allowed">
                  <Button
                    disabled
                    type="button"
                    variant="outline"
                    className="rounded-lg w-[50px] h-[30px] bg-slate-300"
                  >
                    <span className="dark:text-black">Save</span>
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
                        <p
                          className={`${
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
        </div>
      )}
      <div className="flex gap-2">
        <div onClick={toggleReplying} className="cursor-pointer p-[2px] h-fit hover:bg-stone-200 dark:hover:bg-zinc-600 rounded-full">
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
                      <span>Edit Comment</span>
                    </Button>
                  </div>
                </DropdownMenuItem>
                <form
                  action={DeleteCommentAction}
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
      {isReplying && (
        <CommentReply comment={comment} />
      )}
    </>
  );
}
