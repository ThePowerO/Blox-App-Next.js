"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export const FilterTypes = [
  "Recent",
  "Old",
  "Likes",
  "Favorite",
  "Highlighted",
];

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/button";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";
import TextGradient from "../HtmlComponents/TextGradient";

type Props = {
  fightingStyleFilter: string[];
  setFightingStyleFilter: React.Dispatch<React.SetStateAction<string[]>>;
  fruitFilter: string[];
  setFruitFilter: React.Dispatch<React.SetStateAction<string[]>>;
  swordFilter: string[];
  setSwordFilter: React.Dispatch<React.SetStateAction<string[]>>;
  weaponFilter: string[];
  setWeaponFilter: React.Dispatch<React.SetStateAction<string[]>>;
};

export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

export default function ComboFilter({
  fightingStyleFilter,
  setFightingStyleFilter,
  fruitFilter,
  setFruitFilter,
  swordFilter,
  setSwordFilter,
  weaponFilter,
  setWeaponFilter,
}: Props) {
  const SearchParams = useSearchParams();
  const selectedFilter = SearchParams.get("filter");
  const [isOpen, setIsOpen] = useState(false);

  const ReferencesSearchItems = {
    FightingStyles: {
      Combat: "Combat",
      Superhuman: "Superhuman",
      "Sharkman Karate": "Sharkman_Karate",
      "Water Kung Fu": "Water_Kung_Fu",
      "Dark Step": "Dark_Step",
      "Death Step": "Death_Step",
      "Dragon Breath": "Dragon_Breath",
      "Dragon Talon": "Dragon_Talon",
      Godhuman: "Godhuman",
      Eletric: "Eletric",
      "Eletric Claw": "Eletric_Claw",
      "Sanguine Art": "Sanguine_Art",
    },
    Fruits: {
      Dragon: "Dragon",
      Shadow: "Shadow",
      Sound: "Sound",
      Dough: "Dough",
      Spirit: "Spirit",
      Control: "Control",
      Mammoth: "Mammoth",
      Kitsune: "Kitsune",
      "T-Rex": "T-Rex",
      Buddha: "Buddha",
      Gravity: "Gravity",
      Dark: "Dark",
      Light: "Light",
      Ice: "Ice",
      Flame: "Flame",
      Magma: "Magma",
      Phoenix: "Phoenix",
      Rumble: "Rumble",
      Pain: "Pain",
      Portal: "Portal",
      Venom: "Venom",
      Leopard: "Leopard",
      Love: "Love",
      Spider: "Spider",
      Blizzard: "Blizzard",
      Quake: "Quake",
      Ghost: "Ghost",
      Rubber: "Rubber",
      Barrier: "Barrier",
      Falcon: "Falcon",
    },
    Swords: {
      Bisento: "Bisento",
      "Buddy Sword": "Buddy_Sword",
      Canvander: "Canvander",
      "Cursed Dual Katana": "Cursed_Dual_Katana",
      Cutlass: "Cutlass",
      "Dark Blade": "Dark_Blade",
      "Dark Dagger": "Dark_Dagger",
      "Dragon Trident": "Dragon_Trident",
      "Dual Headed Blade": "Dual_Headed_Blade",
      "Dual Katana": "Dual_Katana",
      "Fox Lamp": "Fox_Lamp",
      "Gravity Cane": "Gravity_Cane",
      "Hallow Scythe": "Hallow_Scythe",
      "Iron Mace": "Iron_Mace",
      Jitte: "Jitte",
      Katana: "Katana",
      Koko: "Koko",
      Longsword: "Longsword",
      "Midnight Blade": "Midnight_Blade",
      Pipe: "Pipe",
      "Pole 1": "Pole_1",
      "Pole 2": "Pole_2",
      Rengoku: "Rengoku",
      Saber: "Saber",
      Saddi: "Saddi",
      "Shark Anchor": "Shark_Anchor",
      "Shark Saw": "Shark_Saw",
      Shisui: "Shisui",
      "Soul Cane": "Soul_Cane",
      "Spikey Trident": "Spikey_Trident",
      Trident: "Trident",
      "Triple Dark Blade": "Triple_Dark_Blade",
      "True Triple Katana": "True_Triple_Katana",
      Tushita: "Tushita",
      "Twin Hooks": "Twin_Hooks",
      Wando: "Wando",
      "Warden Sword": "Warden_Sword",
      Yama: "Yama",
    },
    Weapons: {
      "Acidum rifle": "Acidum_Rifle",
      Bazooka: "Bazooka",
      "Bizarre Rifle": "Bizarre_Rifle",
      Cannon: "Cannon",
      Flintlock: "Flintlock",
      Kabucha: "Kabucha",
      Musket: "Musket",
      "Refined Flintlock": "Refined_Flintlock",
      "Refined Musket": "Refined_Musket",
      "Refined Slingshot": "Refined_Slingshot",
      "Serpent Bow": "Serpent_Bow",
      Slingshot: "Slingshot",
      "Soul Guitar": "Soul_Guitar",
    },
  };

  console.log("selected fight", weaponFilter);

  const toggleFruitFilter = (value: string) => {
    setFruitFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleFightingStyleFilter = (value: string) => {
    setFightingStyleFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSwordFilter = (value: string) => {
    setSwordFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleWeaponFilter = (value: string) => {
    setWeaponFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <div className="mt-[20px] flex flex-col gap-1">
        <div className="flex w-full tinymax:px-[10px] px-[40px] py-2 items-center border rounded-xl dark:border-none dark:bg-[#212529]">
          <div className="flex flex-wrap tinymax:gap-1 gap-4 items-center text-sm">
            <p className="text-zinc-400">Filter by:</p>
            {FilterTypes.map((filterType) => (
              <Link
                key={filterType}
                href={`?${new URLSearchParams({
                  filter: filterType,
                })}`}
                scroll={false}
                className={`cursor-pointer w-fit ${
                  filterType === selectedFilter
                    ? "bg-zinc-500 text-white"
                    : "hover:bg-stone-200 dark:hover:bg-zinc-600"
                } text-center border dark:border-black w-[60px] px-2 py-1 rounded-sm`}
              >
                {filterType}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger>
            <Button className="flex items-center gap-1">
              Filter via references {isOpen ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="" align="start">
            <ScrollArea className="w-[290px] petit:w-[360px] tiny:w-[400px] medium:w-[500px] sm:w-[650px] md:w-[780px] lg:w-[1024px] whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-2 p-2">
                <div className="p-2 border flex flex-col gap-1 flex-wrap rounded-lg max-h-[460px]">
                  <TextGradient text="Fighting Styles" from="from-sky-500 font-bold" via="via-cyan-800" to="to-blue-800" />
                  {Object.entries(ReferencesSearchItems.FightingStyles).map(
                    ([key, FightingStyles]) => (
                      <div key={FightingStyles}>
                        <input
                          checked={fightingStyleFilter.includes(FightingStyles)}
                          type="checkbox"
                          value={FightingStyles}
                          id={FightingStyles}
                          onChange={(e) =>
                            toggleFightingStyleFilter(e.target.value)
                          }
                        />
                        <label htmlFor={FightingStyles}>{FightingStyles}</label>
                      </div>
                    )
                  )}
                </div>
                <div className="p-2 border flex flex-col gap-1 flex-wrap rounded-lg max-h-[460px]">
                  <TextGradient text="Fruits" from="from-yellow-500 font-bold" via="via-brown-500" to="to-pink-800" />
                  {Object.entries(ReferencesSearchItems.Fruits).map(
                    ([key, Fruits]) => (
                      <div key={Fruits}>
                        <input
                          checked={fruitFilter.includes(Fruits)}
                          type="checkbox"
                          value={Fruits}
                          id={Fruits}
                          onChange={(e) => toggleFruitFilter(e.target.value)}
                        />
                        <label htmlFor={Fruits}>{Fruits}</label>
                      </div>
                    )
                  )}
                </div>
                <div className="p-2 border flex flex-col gap-1 flex-wrap rounded-lg max-h-[460px]">
                  <TextGradient text="Swords" from="from-purple-500 font-bold" via="via-stone-500" to="to-stone-900" />
                  {Object.entries(ReferencesSearchItems.Swords).map(
                    ([key, Swords]) => (
                      <div key={Swords}>
                        <input
                          checked={swordFilter.includes(Swords)}
                          type="checkbox"
                          value={Swords}
                          id={Swords}
                          onChange={(e) => toggleSwordFilter(e.target.value)}
                        />
                        <label htmlFor={Swords}>{Swords}</label>
                      </div>
                    )
                  )}
                </div>
                <div className="p-2 border flex flex-col gap-1 flex-wrap rounded-lg max-h-[460px]">
                  <TextGradient text="Weapons" from="from-green-500 font-bold" via="via-green-700" to="to-green-800" />
                  {Object.entries(ReferencesSearchItems.Weapons).map(
                    ([key, Weapons]) => (
                      <div key={Weapons}>
                        <input
                          checked={weaponFilter.includes(Weapons)}
                          type="checkbox"
                          value={Weapons}
                          id={Weapons}
                          onChange={(e) => toggleWeaponFilter(e.target.value)}
                        />
                        <label htmlFor={Weapons}>{Weapons}</label>
                      </div>
                    )
                  )}
                </div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
