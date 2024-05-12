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

const FilterTypes = ["Recent", "Old", "Top"];

const FormSchema = z.object({
  CommentText: z.string().min(1, {
    message: "Comment is required",
  }),
});

type InputValue = z.infer<typeof FormSchema>;

export default function CommentSection() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      CommentText: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { data: session } = useSession();
  const [isCommenting, setIsCommenting] = useState(false);
  const [showEmojiList, setShowEmojiList] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCommenting = () => {
    setIsCommenting((prevState) => !prevState);
  };

  const selectedFilterType = FilterTypes[0];

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
            <form ref={formRef} className="flex flex-col p-1 w-full">
              <FormField
                name="CommentText"
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
              <div
                className={`justify-end flex w-full items-center`}
              >
                <div className={`flex`}>
                  <button
                    type="button"
                    onClick={handleCommenting}
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
                        className="flex text-black justify-center w-[60px] px-2 py-1 cursor-pointer rounded-2xl bg-cyan-400 hover:bg-cyan-500"
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
      <div className="mt-[20px] flex flex-col">
        <div className="flex w-full tinymax:px-[10px] px-[40px] py-2 items-center border rounded-xl dark:border-none dark:bg-[#212529]">
          <div className="flex tinymax:gap-1 gap-4 items-center text-sm">
            <p className="text-zinc-400">Filter by:</p>
            {FilterTypes.map((filterType) => (
              <Link
                key={filterType}
                href={`?${new URLSearchParams({
                  filter: filterType,
                })}`}
                scroll={false}
                className={`cursor-pointer ${
                  filterType === selectedFilterType
                    ? "bg-zinc-500 text-white"
                    : "hover:bg-stone-200 dark:hover:bg-zinc-600"
                } text-center place-content-center w-[60px] p-1 rounded-sm`}
              >
                {filterType}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
