"use client";

import { Check, Pencil, X } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
  FormLabel,
} from "../ui/form";
import {
  DifficultyBadge,
  RaceBadge,
  SpecialtyBadge,
  StatsBadge,
} from "../HtmlComponents/ComboBadges";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { UpdateComboStatsAction } from "@/lib/actions/editComboActions";
import { Combo } from "@/lib/types";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";

const FormSchema = z.object({
  comboId: z.string(),
  Specialty: z.string(),
  Race: z.string(),
  Stats: z.string(),
  Difficulty: z.string(),
  pathName: z.string(),
});

type InputType = z.infer<typeof FormSchema>;

export default function BadgeSelector({ combo }: { combo: Combo }) {
  const [selectedSpecialty, setSelectedSpecialty] = useState(combo.specialty);
  const [selectedRace, setSelectedRace] = useState(combo.race);
  const [selectedStats, setSelectedStats] = useState(combo.mainStats);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    combo.difficulty
  );

  const { data: session } = useSession();
  const currentUser = session?.user as User;

  const [isEditingStats, setIsEditingStats] = useState(false);
  const pathName = usePathname();

  const form = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comboId: combo.id,
      Specialty: combo.specialty,
      Race: combo.race,
      Stats: combo.mainStats,
      Difficulty: combo.difficulty,
      pathName: pathName,
    },
  });

  const UpdateComboStats: SubmitHandler<InputType> = async (FormData) => {
    if (combo?.user.id !== currentUser.id) {
      return null;
    }
    await UpdateComboStatsAction(FormData);
    setIsEditingStats(false);
  };

  return (
    <>
      <SpecialtyBadge specialty={selectedSpecialty} />
      <RaceBadge race={selectedRace} />
      <StatsBadge stats={selectedStats} />
      <DifficultyBadge difficulty={selectedDifficulty} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger
          className=" size-fit"
          asChild
        >
          <button className="flex dark:hover:bg-slate-700 hover:bg-slate-200 p-2 rounded-full items-center gap-1 text-sm hover:underline cursor-pointer">
            <Pencil width={15} height={15} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center">
          <DropdownMenuLabel className="p-0">Specialy</DropdownMenuLabel>
          <div className="flex gap-1">
            <div
              onClick={() => {
                setSelectedSpecialty("PVP");
                form.setValue("Specialty", "PVP");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <SpecialtyBadge specialty={"PVP"} />
            </div>
            <div
              onClick={() => {
                setSelectedSpecialty("Grind");
                form.setValue("Specialty", "Grind");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <SpecialtyBadge specialty={"Grind"} />
            </div>
            <div
              onClick={() => {
                setSelectedSpecialty("PVE");
                form.setValue("Specialty", "PVE");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <SpecialtyBadge specialty={"PVE"} />
            </div>
          </div>
          <DropdownMenuLabel className="p-0">Race</DropdownMenuLabel>
          <div className="grid gap-0 size-fit grid-cols-3 petit:grid-cols-5 tiny:flex petit:gap-1">
            <div
              onClick={() => {
                setSelectedRace("Mink");
                form.setValue("Race", "Mink");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <RaceBadge race={"Mink"} />
            </div>
            <div
              onClick={() => {
                setSelectedRace("Skypian");
                form.setValue("Race", "Skypian");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <RaceBadge race={"Skypian"} />
            </div>
            <div
              onClick={() => {
                setSelectedRace("Human");
                form.setValue("Race", "Human");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <RaceBadge race={"Human"} />
            </div>
            <div
              onClick={() => {
                setSelectedRace("Ghoul");
                form.setValue("Race", "Ghoul");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <RaceBadge race={"Ghoul"} />
            </div>
            <div
              onClick={() => {
                setSelectedRace("Cyborg");
                form.setValue("Race", "Cyborg");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <RaceBadge race={"Cyborg"} />
            </div>
            <div
              onClick={() => {
                setSelectedRace("Fishman");
                form.setValue("Race", "Fishman");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <RaceBadge race={"Fishman"} />
            </div>
          </div>
          <DropdownMenuLabel className="p-0">Stats</DropdownMenuLabel>
          <div className="grid grid-cols-3 petit:flex gap-1">
            <div
              onClick={() => {
                setSelectedStats("Main Sword");
                form.setValue("Stats", "Main Sword");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <StatsBadge stats={"Main Sword"} />
            </div>
            <div
              onClick={() => {
                setSelectedStats("Main Gun");
                form.setValue("Stats", "Main Gun");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <StatsBadge stats={"Main Gun"} />
            </div>
            <div
              onClick={() => {
                setSelectedStats("Main Fruit");
                form.setValue("Stats", "Main Fruit");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <StatsBadge stats={"Main Fruit"} />
            </div>
            <div
              onClick={() => {
                setSelectedStats("Hybrid");
                form.setValue("Stats", "Hybrid");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <StatsBadge stats={"Hybrid"} />
            </div>
          </div>
          <DropdownMenuLabel className="p-0">Difficulty</DropdownMenuLabel>
          <div className="flex gap-1">
            <div
              onClick={() => {
                setSelectedDifficulty("Hard");
                form.setValue("Difficulty", "Hard");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <DifficultyBadge difficulty={"Hard"} />
            </div>
            <div
              onClick={() => {
                setSelectedDifficulty("No Skill");
                form.setValue("Difficulty", "No Skill");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <DifficultyBadge difficulty={"No Skill"} />
            </div>
            <div
              onClick={() => {
                setSelectedDifficulty("Medium");
                form.setValue("Difficulty", "Medium");
                setIsEditingStats(true);
              }}
              className="cursor-pointer rounded-full w-fit h-fit"
            >
              <DifficultyBadge difficulty={"Medium"} />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditingStats && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(UpdateComboStats)}
            className="p"
          >
            <input type="hidden" name="comboId" value={combo.id} />
            <input type="hidden" name="pathName" value={pathName} />
            <input
              type="hidden"
              name="Specialty"
              value={form.getValues("Specialty")}
            />
            <input type="hidden" name="Race" value={form.getValues("Race")} />
            <input type="hidden" name="Stats" value={form.getValues("Stats")} />
            <input
              type="hidden"
              name="Difficulty"
              value={form.getValues("Difficulty")}
            />
            <button
              className="p-1 text-green-500 m-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
              type="submit"
            >
              <Check size={19} />
            </button>
            <button
              onClick={() => {
                setIsEditingStats(false);
                setSelectedSpecialty(combo.specialty);
                setSelectedRace(combo.race);
                setSelectedStats(combo.mainStats);
                setSelectedDifficulty(combo.difficulty);
              }}
              className="p-1 m-1 bg-red-200 text-red-500 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
              type="button"
            >
              <X size={19} />
            </button>
          </form>
        </Form>
      )}
    </>
  );
}
