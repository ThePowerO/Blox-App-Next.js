"use client";

import { Reply, SendHorizonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import TextareaAutosize from "react-textarea-autosize";

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
import { usePathname } from "next/navigation";
import { Comment } from "@/lib/types";
import { Button } from "../ui/button";
import { SendCommentReply } from "../HtmlComponents/SubmitButtons";
import { CreateReply, createComment } from "@/lib/actions/commentActions";
import { useTranslations } from "next-intl";

type Props = {
  comment: Comment;
  toggleReplying: () => void;
  replyUserName: string | null;
};

// #212529

export default function CommentReply({ comment, replyUserName, toggleReplying }: Props) {
  const t = useTranslations("CommentText");
  const [textValue, setTextValue] = useState("@" + replyUserName + " ");
  const pathName = usePathname();

  const FormSchema = z.object({
    text: z.string().min(1, {
      message: "Text is required",
    }),
  });

  type InputType = z.infer<typeof FormSchema>;

  const form = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "@" + comment.user.name,
    },
  });

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const length = textAreaRef.current.value.length;
      textAreaRef.current.setSelectionRange(length, length);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
    form.setValue("text", event.target.value);
  };

  const highlightText = (text: string) => {
    const userName = "@" + replyUserName;
    const parts = text.split(new RegExp(`(${userName})`, "g"));

    return parts.map((part, index) =>
      part === userName ? (
        <span key={index} className="text-cyan-500">
          {part}
        </span>
      ) : (
        <span key={index} className="dark:text-white text-black">
          {part}
        </span>
      )
    );
  };

  const containsLetter = (text: string) => {
    const userName = "@" + replyUserName;
    const trimmedText = text.replace(userName, "").trim();
    return /[^\s]/.test(trimmedText);
  };

  return (
    <div className="relative w-full mt-2">
      <Form {...form}>
        <form action={async (FormData) => {
          form.reset();
          toggleReplying();
          await CreateReply(FormData);
        }}>
          <input type="hidden" name="pathName" value={pathName} />
          <input type="hidden" name="comboId" value={comment.comboId} />
          <input type="hidden" name="parentId" value={comment.id} />
          <FormField
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <div
                      className="absolute inset-0 p-2 whitespace-pre-wrap break-words pointer-events-none"
                      aria-hidden="true"
                    >
                      {highlightText(textValue)}
                    </div>
                    <TextareaAutosize
                      {...field}
                      ref={textAreaRef}
                      value={textValue}
                      autoFocus
                      onChange={handleInputChange}
                      minRows={1}
                      maxLength={4000}
                      required
                      className="w-full p-2 rounded-md focus:outline-none border focus:ring-2 focus:ring-cyan-300 focus:border-transparent text-transparent caret-black dark:caret-white "
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end gap-2">
            <Button
              onClick={() => {
                form.reset();
                toggleReplying();
              }}
              type="button"
              variant="outline"
              className="rounded-lg w-fit h-[30px] dark:hover:bg-stone-800 hover:bg-stone-300"
            >
              <span>{t("Cancel")}</span>
            </Button>
            {!containsLetter(textValue) ? (
              <div className="cursor-not-allowed">
                <Button
                  disabled
                  type="button"
                  variant="outline"
                  className="rounded-lg w-[50px] h-[30px] bg-slate-300"
                >
                  <SendHorizonal className="dark:text-black" width={18} height={18} />
                </Button>
              </div>
            ) : (
              <SendCommentReply />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}