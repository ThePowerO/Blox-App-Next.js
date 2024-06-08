'use client';

import React, { useState } from "react";
import Image from "next/image";
import { Check, Pencil } from "lucide-react";
import { BloxFruitImages } from "@/BloxFruitImages";
import { Combo } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { UpdateComboImgs } from "@/lib/actions/editComboActions";
import { toast } from "react-toastify";

const FormSchema = z.object({
  comboId: z.string(),
  FightingStyle: z
    .string()
    .min(1, "Fighting Style is required"),
  Fruit: z
    .string()
    .min(1, "Fruit is required"),
  Sword: z
    .string()
    .min(1, "Sword is required"),
  Weapon: z
    .string()
    .min(1, "Weapon is required"),
  pathName: z.string(),
})

type FormType = z.infer<typeof FormSchema>;

export default function BloxImagesSelector({ combo }: { combo: Combo }) {
  const [selectedFightingStyle, setSelectedFightingStyle] = useState(combo.fightingstyle);
  const [selectedWeapon, setSelectedWeapon] = useState(combo.weapon);
  const [selectedSword, setSelectedSword] = useState(combo.sword);
  const [selectedFruit, setSelectedFruit] = useState(combo.fruit);
  
  const pathName = usePathname();

  const [isEditingImgs, setIsEditingImgs] = useState(false);

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comboId: combo.id,
      FightingStyle: combo.fightingstyle,
      Fruit: combo.fruit,
      Sword: combo.sword,
      Weapon: combo.weapon,
      pathName: pathName,
    },
  })

  const UpdateComboImgsAction: SubmitHandler<FormType> = async (FormData) => {
    try {
      await UpdateComboImgs(FormData);
      setIsEditingImgs(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to change combo build");
    }
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Fighting Styles */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <div className="relative cursor-pointer group w-full">
            <Image
              fetchPriority="high"
              src={selectedFightingStyle}
              className="border rounded-md w-full"
              alt={`${combo.fightingstyle
                .toString()
                .substring(20)
                .replace(/\.[^/.]+$/, "")
                .replace(/\d+/g, "")}`}
              width={140}
              height={140}
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black opacity-0 group-hover:opacity-50 rounded-md transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Pencil className="w-8 h-8 text-white" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <div className="grid petitmax:grid-cols-4 petit:grid-cols-5 tiny:grid-cols-6 tiny420px:grid-cols-7 gap-2">
            {BloxFruitImages["Fighting Styles"] &&
              Object.entries(BloxFruitImages["Fighting Styles"]).map(
                ([style, image]) => (
                  <div
                    key={style}
                    className={`relative rounded-md cursor-pointer ${image.src === selectedFightingStyle ? "gradient-border animate-in" : ""}
                    border dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150`}
                    onClick={() => {
                      setSelectedFightingStyle(image.src);
                      setIsEditingImgs(true);
                      form.setValue("FightingStyle", image.src);
                    }}
                  >
                    <Image
                      src={image}
                      alt={style}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </div>
                )
              )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Fruits */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <div className="relative cursor-pointer group w-full">
            <Image
              fetchPriority="high"
              src={selectedFruit}
              className="border rounded-md w-full"
              alt={`${combo.fruit
                .toString()
                .substring(20)
                .replace(/\.[^/.]+$/, "")
                .replace(/\d+/g, "")}`}
              width={140}
              height={140}
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black opacity-0 group-hover:opacity-50 rounded-md transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Pencil className="w-8 h-8 text-white" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <div className="grid petitmax:grid-cols-5 petit:grid-cols-6 tiny420px:grid-cols-7 gap-1 petit:gap-2">
            {BloxFruitImages["Fruits"] &&
              Object.entries(BloxFruitImages["Fruits"]).map(
                ([style, image]) => (
                  <div
                    key={style}
                    className={`relative rounded-md cursor-pointer ${image.src === selectedFruit ? "gradient-border animate-in" : ""}
                    border dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150`}
                    onClick={() => {
                      setSelectedFruit(image.src);
                      setIsEditingImgs(true);
                      form.setValue("Fruit", image.src);
                    }}
                  >
                    <Image
                      src={image}
                      alt={style}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </div>
                )
              )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Swords */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <div className="relative cursor-pointer group w-full">
            <Image
              fetchPriority="high"
              src={selectedSword}
              className="border rounded-md w-full"
              alt={`${combo.sword
                .toString()
                .substring(20)
                .replace(/\.[^/.]+$/, "")
                .replace(/\d+/g, "")}`}
              width={140}
              height={140}
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black opacity-0 group-hover:opacity-50 rounded-md transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Pencil className="w-8 h-8 text-white" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <div className="grid petitmax:grid-cols-5 petit:grid-cols-6 tiny420px:grid-cols-7 gap-1 petit:gap-2 ">
            {BloxFruitImages["Swords"] &&
              Object.entries(BloxFruitImages["Swords"]).map(
                ([style, image]) => (
                  <div
                    key={style}
                    className={`relative rounded-md cursor-pointer ${image.src === selectedSword ? "gradient-border animate-in" : ""}
                    border dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150`}
                    onClick={() => {
                      setSelectedSword(image.src);
                      setIsEditingImgs(true);
                      form.setValue("Sword", image.src);
                    }}
                  >
                    <Image
                      src={image}
                      alt={style}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </div>
                )
              )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Weapon */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <div className="relative cursor-pointer group w-full">
            <Image
              fetchPriority="high"
              src={selectedWeapon}
              className="border rounded-md w-full"
              alt={`${combo.weapon
                .toString()
                .substring(20)
                .replace(/\.[^/.]+$/, "")
                .replace(/\d+/g, "")}`}
              width={140}
              height={140}
            />
            <div className="absolute inset-0 bg-black/40 dark:bg-black opacity-0 group-hover:opacity-50 rounded-md transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Pencil className="w-8 h-8 text-white" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <div className="grid grid-cols-5 petit:grid-cols-6 tiny420px:grid-cols-7 gap-1 petit:gap-2">
            {BloxFruitImages["Weapons"] &&
              Object.entries(BloxFruitImages["Weapons"]).map(
                ([style, image]) => (
                  <div
                    key={style}
                    className={`relative rounded-md cursor-pointer ${image.src === selectedWeapon ? "gradient-border animate-in" : ""}
                    border dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150`}
                    onClick={() => {
                      setSelectedWeapon(image.src);
                      setIsEditingImgs(true);
                      form.setValue("Weapon", image.src);
                    }}
                  >
                    <Image
                      src={image}
                      alt={style}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </div>
                )
              )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditingImgs && (
        <Form {...form} >
          <form onSubmit={form.handleSubmit(UpdateComboImgsAction)} className="relative col-span-4 flex mr-2 justify-end">
            <input type="hidden" name="comboId" value={combo.id} />
            <input type="hidden" name="FightingStyle" value={form.getValues("FightingStyle")} />
            <input type="hidden" name="Fruit" value={form.getValues("Fruit")} />
            <input type="hidden" name="Sword" value={form.getValues("Sword")} />
            <input type="hidden" name="Weapon" value={form.getValues("Weapon")} />
            <input type="hidden" name="pathName" value={pathName} />
            <button className="absolute p-1 border border-green-500 hover:bg-slate-200 rounded-full cursor-pointer">
              <Check className="text-green-500" size={18} />
            </button>
          </form>
          {form.formState.errors.FightingStyle && (
            <FormMessage className="text-red-500">
              FightingStyle is required.
            </FormMessage>
          )}
          {form.formState.errors.Fruit && (
            <FormMessage className="text-red-500">
              Fruit is required.
            </FormMessage>
          )}
          {form.formState.errors.Sword && (
            <FormMessage className="text-red-500">
              Sword is required.
            </FormMessage>
          )}
          {form.formState.errors.Weapon && (
            <FormMessage className="text-red-500">
              Weapon is required.
            </FormMessage>
          )}
        </Form>
      )}
    </div>
  );
}
