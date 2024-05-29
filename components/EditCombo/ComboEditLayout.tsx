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
import { UpdateComboTitle } from "@/lib/actions/editComboActions";
import { usePathname } from "next/navigation";

type Props = {
  combo: Combo;
};

export default function ComboEditLayout({ combo }: Props) {
  const { data: session } = useSession();
  const currentUser = session?.user as User;

  const pathName = usePathname();

  const [editingTitle, setEditingTitle] = useState(false);

  return (
    <>
      <section className="hidden sm:block w-full p-4 rounded-lg">
        <header className="flex items-center justify-between border-b pb-2 mb-4">
          <h1 className="text-lg flex items-center gap-2 font-semibold">
            {editingTitle ? (
              <form
                action={async (FormData) => {
                  await UpdateComboTitle(FormData);
                  setEditingTitle(!editingTitle);
                }}
                className="flex items-center gap-2"
              >
                <input type="hidden" name="comboId" value={combo.id} />
                <input type="hidden" name="pathName" value={pathName} />
                <input
                  autoFocus
                  className="w-[350px] outline-none"
                  defaultValue={combo.combotitle}
                  name="comboTitle"
                />
                <button
                  className={`ml-2 cursor-pointer  dark:hover:bg-slate-700 hover:bg-slate-200 rounded-full p-1`}
                  type="submit"
                >
                  <Check className={``} size={16} />
                </button>
                <div
                  onClick={() => setEditingTitle(!editingTitle)}
                  className="cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-200 rounded-full p-1"
                >
                  <X className="text-red-500" size={16} />
                </div>
              </form>
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
          <StopEditingLink />
        </header>

        <div className="flex flex-col sm:items-center sm:flex-row gap-4 mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[combo.fightingstyle, combo.fruit, combo.sword, combo.weapon].map(
              (src, index) => (
                <Image
                  key={index}
                  fetchPriority="high"
                  src={src}
                  className="border rounded-md w-full"
                  alt="combo image"
                  width={140}
                  height={140}
                />
              )
            )}
          </div>
          <Textarea
            className="h-[140px] w-full resize-none"
            readOnly
            value={combo.combodescription}
          />
        </div>

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
        <div className="flex items-center w-full gap-2 border rounded-[8px] p-2">
          <h1 className="text-[12px]">
            You are viewing the combo{" "}
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
