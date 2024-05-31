"use client";

import Image from "next/image";
import React, { useState } from "react";
import { HoverComboAuthor } from "../HtmlComponents/HoverComboAuthor";
import { Textarea } from "@/components/ui/textarea";
import {
  DifficultyBadge,
  RaceBadge,
  SpecialtyBadge,
  StatsBadge,
} from "../HtmlComponents/ComboBadges";
import ComboVideo from "../HtmlComponents/ComboVideo";
import { Separator } from "../ui/separator";
import { Combo, User } from "@prisma/client";
import StopEditingLink from "./StopEditingLink";
import { useSession } from "next-auth/react";
import { Check, Pencil, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  UpdateComboDescription,
  UpdateComboTitle,
} from "@/lib/actions/editComboActions";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BloxFruitImages } from "@/BloxFruitImages";

import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
} from "../ui/form";
import BloxImagesSelector from "./BloxImagesSelector";

type Props = {
  combo: Combo;
};

const UpdateComboTitleSchema = z.object({
  comboTitle: z
    .string()
    .min(1, "Title is required")
    .max(40, "Title is too long"),
  comboId: z.string(),
  pathName: z.string(),
});

type TitleType = z.infer<typeof UpdateComboTitleSchema>;

export default function ComboEditLayout({ combo }: Props) {
  const { data: session } = useSession();
  const currentUser = session?.user as User;
  const pathName = usePathname();

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(combo.combodescription);

  const form = useForm<TitleType>({
    resolver: zodResolver(UpdateComboTitleSchema),
    defaultValues: {
      comboTitle: combo.combotitle,
      comboId: combo.id,
      pathName: pathName,
    },
  });

  const UpdateComboTitle1: SubmitHandler<TitleType> = async (FormData) => {
    await UpdateComboTitle(FormData);
    setEditingTitle(false);
  };

  const [activeCategory, setActiveCategory] = useState('');

  return (
    <>
      <section className="hidden sm:block w-full p-4 rounded-lg">
        <header className="flex items-center justify-between border-b pb-2 mb-4">
          <h1 className="text-lg flex items-center gap-2 font-semibold">
            {editingTitle ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(UpdateComboTitle1)}
                  className="flex items-center gap-2"
                >
                  <input type="hidden" name="comboId" value={combo.id} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <FormField
                    control={form.control}
                    name="comboTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            autoFocus
                            className={`w-[350px] outline-none
                              ${
                                form.formState.errors.comboTitle
                                  ? "border focus-visible:ring-0 border-red-500"
                                  : ""
                              }
                            `}
                            defaultValue={combo.combotitle}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <button
                    className={`ml-2 cursor-pointer  dark:hover:bg-slate-700 hover:bg-slate-200 rounded-full p-1`}
                    type="submit"
                  >
                    <Check className={``} size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTitle(!editingTitle)}
                    className="cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-200 rounded-full p-1"
                  >
                    <X className="text-red-500" size={16} />
                  </button>
                  {form.formState.errors.comboTitle && (
                    <FormMessage className="text-red-500">
                      {form.formState.errors.comboTitle.message}
                    </FormMessage>
                  )}
                </form>
              </Form>
            ) : (
              <>
                <span className="text-gradient bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {combo.combotitle}
                </span>
                <div
                  onClick={() => setEditingTitle(!editingTitle)}
                  className="cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-200 rounded-full p-2"
                >
                  <Pencil className="" size={16} />
                </div>
              </>
            )}
          </h1>
          <StopEditingLink comboSlug={combo.slug} />
        </header>

        <div className="flex flex-col sm:items-center sm:flex-row gap-4 mb-4">
          <BloxImagesSelector combo={combo} />
          <Textarea
            className="h-[140px] w-full resize-none"
            onFocus={() => setEditingDescription(true)}
            value={descriptionValue}
            onChange={(e) => setDescriptionValue(e.target.value)}
          />
        </div>
        {editingDescription && (
          <form
            action={async (FormData) => {
              await UpdateComboDescription(FormData);
              setEditingDescription(false);
            }}
            className="flex items-center justify-end gap-2"
          >
            <input
              type="hidden"
              name="comboDescription"
              value={descriptionValue}
            />
            <input type="hidden" name="comboId" value={combo.id} />
            <input type="hidden" name="pathName" value={pathName} />
            <button
              className={`ml-2 cursor-pointer  dark:hover:bg-slate-700 hover:bg-slate-200 rounded-full p-1`}
              type="submit"
            >
              <Check className={``} size={16} />
            </button>
            <div
              onClick={() => {
                setEditingDescription(!editingDescription);
                setDescriptionValue(combo.combodescription);
              }}
              className="cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-200 rounded-full p-1"
            >
              <X className="text-red-500" size={16} />
            </div>
          </form>
        )}

        <div className="mb-4">
          <h2 className="font-bold mb-2">Combo Properties:</h2>
          <div className="flex gap-2">
            <SpecialtyBadge specialty={combo.specialty} />
            <RaceBadge race={combo.race} />
            <StatsBadge stats={combo.mainStats} />
            <DifficultyBadge difficulty={combo.difficulty} />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            Built by{" "}
            <HoverComboAuthor
              authorCreatedAt={combo.authorCreatedAt}
              comboAuthor={combo.author}
              authorImage={combo.authorImage}
            />
          </div>
        </div>

        <div>
          <ComboVideo comboVideo={combo.comboVideo} />
        </div>

        <Separator className="text-black mt-4" />
      </section>
      <section className="sm:hidden w-full grid grid-cols-1 gap-2 p-2">
        <div className="flex items-center w-full gap-2 border border-white rounded-[8px] p-2">
          <h1 className="text-[12px]">
            <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text font-extrabold text-transparent">
              {combo.combotitle}
            </span>
          </h1>
        </div>
        <div className="flex petit:justify-center w-full gap-2">
          {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon].map(
            (src, index) => (
              <Image
                key={index}
                fetchPriority="high"
                src={src}
                className="border rounded-[8px] w-1/4 min-w-[60px] petit:w-[80px]"
                alt="combo image"
                width={60}
                height={60}
              />
            )
          )}
        </div>
        <div className="flex items-center justify-between sm:justify-normal w-full gap-1">
          <div className="">
            built by
            <HoverComboAuthor
              authorCreatedAt={combo.authorCreatedAt}
              comboAuthor={combo.author}
              authorImage={combo.authorImage}
            />
          </div>
        </div>
        <Textarea
          className="h-[120px]"
          readOnly
          value={combo.combodescription}
        />
        <h2 className="font-bold">Combo Properties:</h2>
        <div className="flex gap-2">
          <SpecialtyBadge specialty={combo.specialty} />
          <RaceBadge race={combo.race} />
          <StatsBadge stats={combo.mainStats} />
          <DifficultyBadge difficulty={combo.difficulty} />
        </div>
        <ComboVideo comboVideo={combo.comboVideo} />
        <Separator className="text-black mt-2" />
      </section>
    </>
  );
}
