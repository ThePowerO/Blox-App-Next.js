"use client";

import React, { useRef, useState } from "react";
import { AvatarDemo } from "../HtmlComponents/AvatarDemo";
import { useSession } from "next-auth/react";
import TextareaAutosize from "react-textarea-autosize";
import noAvatar from "@/public/Icons/noavatar.png";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SendHorizonal } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComment } from "@/lib/actions/commentActions";
import { Combo } from "@/lib/types";
import { usePathname } from "next/navigation";
import CommentFilter from "./CommentFilter";
import CommentsDisplay from "./CommentsDisplay";
import { useTranslations } from "next-intl";
import { CreateCommentBtn } from "../HtmlComponents/SubmitButtons";
import { User } from "@prisma/client";

const hasNoSpaces = (text: string) => {
  return text && !/\s/.test(text);
};

type Props = {
  combo: Combo;
  userId: string;
  user: User;
};

export default function CommentSection({ combo, userId, user }: Props) {

  const t = useTranslations("CommentSection")
  const t2 = useTranslations("CommentText")

  const FormSchema = z.object({
    text: z
    .string()
    .trim()
    .min(1, {
      message: t("CommentRequired"),
    })
    .refine(val => val.trim().length > 0, {
      message: t("CommentRequired"),
    })
  });

  type InputValue = z.infer<typeof FormSchema>;


  const form = useForm<InputValue>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const { data: session } = useSession();
  const [isCommenting, setIsCommenting] = useState(false);
  const pathName = usePathname();
  const formRef = useRef<HTMLFormElement>(null);

  const handleCommenting = () => {
    setIsCommenting((prevState) => !prevState);
  };

  return (
    <div className="p-2">
      <div className="flex items-center gap-2">
        <p>{t("Comments")}</p>
        <div className="px-[6px] bg-zinc-500 text-white rounded-full">
          <span className="font-bold">
            {combo.comments.length || 0}
          </span>
        </div>
      </div>
      <div className="flex mt-3">
        <div className="mr-[8px] rounded-full border border-black h-fit">
          <AvatarDemo
            userImg={session?.user ? user.image : noAvatar}
            userNickName={user.name}
          />
        </div>

        {isCommenting ? (
          <Form {...form}>
            <form
              ref={formRef}
              action={async (FormData) => {
                form.reset();
                handleCommenting();
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
                        placeholder={t("WriteComment")}
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
                    {t2("Cancel")}
                  </button>
                  {session?.user ? (
                    <div>
                      {!form.formState.isValid || isLoading || form.watch("text").trim() === "" ? (
                        <button
                          disabled
                          className="flex justify-center w-[60px] disabled:cursor-not-allowed text-black px-2 py-1 rounded-2xl dark:bg-stone-800 bg-stone-300"
                          type="button"
                        >
                          <SendHorizonal className="size-6" />
                        </button>
                      ) : (
                        <CreateCommentBtn />
                      )}
                    </div>
                  ) : (
                    <button
                      disabled
                      className="flex justify-center w-[60px] disabled:cursor-not-allowed text-black px-2 py-1 rounded-2xl dark:bg-stone-800 bg-stone-300"
                      type="button"
                    >
                      <SendHorizonal className="size-6" />
                    </button>
                  )}
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
              {t("WriteComment")}
            </p>
          </div>
        )}
      </div>
      <CommentFilter />
      <CommentsDisplay userId={userId} comments={combo.comments} />
    </div>
  );
}