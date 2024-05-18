"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { AvatarDemo } from "../HtmlComponents/AvatarDemo";
import { useSession } from "next-auth/react";
import TextareaAutosize from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SendHorizonal } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComment } from "@/lib/actions/commentActions";
import { Combo } from "@/lib/types";
import { usePathname } from "next/navigation";
import { text } from "node:stream/consumers";
import CommentFilter from "./CommentFilter";
import CommentsDisplay from "./CommentsDisplay";
import { useOptimistic } from "react";
import { Comment } from "@/lib/types";
import { CommentLike } from "@/lib/types";

const FormSchema = z.object({
  text: z.string().min(1, {
    message: "Comment is required",
  }),
});

type InputValue = z.infer<typeof FormSchema>;

type Props = {
  combo: Combo;
  userId: string;
};

export default function CommentSection({ combo, userId }: Props) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { data: session } = useSession();
  const [isCommenting, setIsCommenting] = useState(false);
  const [showEmojiList, setShowEmojiList] = useState(false);
  const pathName = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    combo.comments,
    (state, newComment: Comment) => {
      return [...state, newComment];
    }
  );

  const handleCommenting = () => {
    setIsCommenting((prevState) => !prevState);
  };

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <p>Comments</p>
        <div className="px-[6px] bg-zinc-500 text-white rounded-full">
          <span className="font-bold">{0}</span>
        </div>
      </div>
      <div className="flex mt-3">
        <div className="mr-[8px] rounded-full border border-black h-fit">
          <AvatarDemo
            userImg={session?.user?.image}
            userNickName={session?.user?.name}
          />
        </div>

        {isCommenting ? (
          <Form {...form}>
            <form
              ref={formRef}
              action={async (FormData) => {
                const comment = {
                  id: "",
                  text: form.getValues("text"),
                  comboId: combo.id,
                  userId: userId,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                  likes: [], // * TODO: value to insert and then - 1 when displaying *
                  user: {
                    id: userId,
                    name: session?.user?.name || "",
                    image: session?.user?.image || "",
                  },
                };

                handleCommenting();
                form.reset();
                addOptimisticComment(comment);
                await createComment(FormData);
              }}
              className="flex flex-col p-1 w-full"
            >
              <input type="hidden" name="comboId" value={combo.id} />
              <input type="hidden" name="pathName" value={pathName} />
              <FormField
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextareaAutosize
                        {...field}
                        autoFocus
                        suppressHydrationWarning
                        minRows={1}
                        maxLength={4000}
                        className={`border-b-[2px]  dark:border-white bg-transparent w-full border-black outline-none text-sm`}
                        placeholder="Write a comment..."
                        style={{ resize: "none" }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <div className={`justify-end flex w-full items-center`}>
                <div className={`flex`}>
                  <button
                    type="button"
                    onClick={() => {
                      handleCommenting();
                      form.reset();
                    }}
                    className="cursor-pointer px-4 py-1 mr-1 dark:hover:bg-stone-800 hover:bg-stone-300 rounded-2xl"
                  >
                    Cancel
                  </button>
                  <div>
                    {!form.formState.isValid || isLoading ? (
                      <button
                        disabled
                        className="flex justify-center w-[60px] disabled:cursor-not-allowed text-black px-2 py-1 rounded-2xl dark:bg-stone-800 bg-stone-300"
                        type="button"
                      >
                        <SendHorizonal className="size-6" />
                      </button>
                    ) : (
                      <button
                        disabled={isLoading}
                        className="flex shadow-md shadow-cyan-500/50 text-black justify-center w-[60px] px-2 py-1 cursor-pointer rounded-2xl bg-cyan-400 hover:bg-cyan-500"
                        type="submit"
                      >
                        <SendHorizonal className="size-6" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </Form>
        ) : (
          <div
            onClick={handleCommenting}
            className="flex cursor-text gap-[4px] flex-col items-center border-none p-1 rounded-lg w-full"
          >
            <p className="border-b-[2px] dark:border-white text-zinc-400 w-full border-black outline-none text-sm">
              Write a comment...
            </p>
          </div>
        )}
      </div>
      <CommentFilter />
      <CommentsDisplay userId={userId} comments={combo.comments} />
    </div>
  );
}
