'use client';

import { Reply } from "lucide-react";
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


type Props = {
  comment: Comment
};

// #212529



export default function CommentReply({ comment }: Props) {
  const [textValue, setTextValue] = useState("@" + comment.user.name + " ");
  const pathName = usePathname();

  const FormSchema = z.object({
    text: z.string().min(1, {
      message: "Text is required",
    })
  })

  type InputType = z.infer<typeof FormSchema>

  const form = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "@" + comment.user.name + " ",
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
    const userName = "@" + comment.user.name;
    const parts = text.split(new RegExp(`(${userName})`, 'g'));

    return parts.map((part, index) =>
      part === userName ? (
        <span key={index} className="text-cyan-500">{part}</span>
      ) : (
        <span key={index} className="text-white">{part}</span>
      )
    );
  };

  return (
    <div className="relative w-full">
      <Form {...form}>
        <form className="">
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
                      className="w-full p-2 rounded-md focus:outline-none border focus:ring-2 focus:ring-cyan-300 focus:border-transparent text-transparent caret-white"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}