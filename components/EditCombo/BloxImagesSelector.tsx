'use client';

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { BloxFruitImages } from "@/BloxFruitImages";
import { Combo } from "@prisma/client";

export default function BloxImagesSelector({ combo }: { combo: Combo }) {
  const [selectedFightingStyle, setSelectedFightingStyle] = useState(
    combo.fightingstyle
  );
  const [selectedWeapon, setSelectedWeapon] = useState(combo.weapon);
  const [selectedSword, setSelectedSword] = useState(combo.sword);
  const [selectedFruit, setSelectedFruit] = useState(combo.fruit);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
          <div className="grid grid-cols-7 gap-2">
            {BloxFruitImages["Fighting Styles"] &&
              Object.entries(BloxFruitImages["Fighting Styles"]).map(
                ([style, image]) => (
                  <Image
                    onClick={() => setSelectedFightingStyle(image.src)}
                    key={style}
                    src={image}
                    className="border rounded-md cursor-pointer dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150"
                    alt={style}
                    width={50}
                    height={50}
                  />
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
          <div className="grid grid-cols-7 gap-2">
            {BloxFruitImages["Fruits"] &&
              Object.entries(BloxFruitImages["Fruits"]).map(
                ([style, image]) => (
                  <Image
                    onClick={() => setSelectedFruit(image.src)}
                    key={style}
                    src={image}
                    className="border rounded-md cursor-pointer dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150"
                    alt={style}
                    width={50}
                    height={50}
                  />
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
          <div className="grid grid-cols-7 gap-2">
            {BloxFruitImages["Swords"] &&
              Object.entries(BloxFruitImages["Swords"]).map(
                ([style, image]) => (
                  <Image
                    onClick={() => setSelectedSword(image.src)}
                    key={style}
                    src={image}
                    className="border rounded-md cursor-pointer dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150"
                    alt={style}
                    width={50}
                    height={50}
                  />
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
          <div className="grid grid-cols-7 gap-2">
            {BloxFruitImages["Weapons"] &&
              Object.entries(BloxFruitImages["Weapons"]).map(
                ([style, image]) => (
                  <Image
                    onClick={() => setSelectedWeapon(image.src)}
                    key={style}
                    src={image}
                    className="border rounded-md cursor-pointer dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150"
                    alt={style}
                    width={50}
                    height={50}
                  />
                )
              )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
