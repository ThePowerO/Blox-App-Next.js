'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import PlusIcon from "@/public/Icons/PlusIcon2.png"
// Fruits
import Shadow from "@/public/FruitsBlox/ShadowFruit.png"
import Sound from "@/public/FruitsBlox/SoundFruit.png"
import Dough from "@/public/FruitsBlox/DoughFruit.webp"
import Spirit from "@/public/FruitsBlox/SpiritFruit.webp"
import Control from "@/public/FruitsBlox/ControlFruit.webp"
import Mammoth from "@/public/FruitsBlox/MammothFruit.webp"
import Kitsune from "@/public/FruitsBlox/KitsuneFruit.webp"
import TRex from "@/public/FruitsBlox/T-RexFruit.webp"
import Buddha from "@/public/FruitsBlox/BuddhaFruit.webp"
import Gravity from "@/public/FruitsBlox/GravityFruit.webp"
import Dark from "@/public/FruitsBlox/DarkFruit.webp"
import Light from "@/public/FruitsBlox/LightFruit.webp"
import Ice from "@/public/FruitsBlox/IceFruit.webp"
import Flame from "@/public/FruitsBlox/FlameFruit.webp"
import Magma from "@/public/FruitsBlox/MagmaFruit.webp"
import Phoenix from "@/public/FruitsBlox/PhoenixFruit.webp"
import Rumble from "@/public/FruitsBlox/RumbleFruit.webp"
import Pain from "@/public/FruitsBlox/PainFruit.webp"
import Portal from "@/public/FruitsBlox/PortalFruit.webp"
import Venom from "@/public/FruitsBlox/VenomFruit.webp"
import Leopard from "@/public/FruitsBlox/LeopardFruit.webp"
import Love from "@/public/FruitsBlox/LoveFruit.webp"
import Spider from "@/public/FruitsBlox/SpiderFruit.webp"
import Blizzard from "@/public/FruitsBlox/BlizzardFruit.webp"
import Quake from "@/public/FruitsBlox/QuakeFruit.webp"
import Ghost from "@/public/FruitsBlox/GhostFruit.webp"
import Rubber from "@/public/FruitsBlox/RubberFruit.webp"
import Barrier from "@/public/FruitsBlox/BarrierFruit.webp"
import Falcon from "@/public/FruitsBlox/FalconFruit.webp"
import Spike from "@/public/FruitsBlox/SpikeFruit.webp"
import Smoke from "@/public/FruitsBlox/SmokeFruit.webp"
import Bomb from "@/public/FruitsBlox/BombFruit.webp"
import Diamond from "@/public/FruitsBlox/DiamondFruit.webp"
import Dragon from "@/public/FruitsBlox/DragonFruit.webp"
import Chop from "@/public/FruitsBlox/ChopFruit.webp"
// Fighting Styles
import Super_Human from "@/public/StylesBlox/Superhuman.png"
import Sharkman_Karate from "@/public/StylesBlox/Sharkman_Karate.png"
import Water_Kung_Fu from "@/public/StylesBlox/Water_Kung_Fu.png"
import Dark_Step from "@/public/StylesBlox/Dark_Step.png"
import Death_Step from "@/public/StylesBlox/Death_Step.png"
import Dragon_Breath from "@/public/StylesBlox/Dragon_Breath.png"
import Dragon_Talon from "@/public/StylesBlox/Dragon_Talon.png"
import Godhuman from "@/public/StylesBlox/Godhuman.png"
import Eletric from "@/public/StylesBlox/Electric.png"
import Eletric_Claw from "@/public/StylesBlox/Electric_Claw.png"
import Sanguine_Art from "@/public/StylesBlox/Sanguine_Art.png"
import Combat from "@/public/StylesBlox/Combat.png"
// Swords
import Bisento from '@/public/SwordsBlox/Bisento.png'
import Buddy_Sword from '@/public/SwordsBlox/Buddy_Sword.png'
import Canvander from '@/public/SwordsBlox/Canvander.png'
import Cursed_Dual_Katana from '@/public/SwordsBlox/Cursed_Dual_Katana.png'
import Cutlass from '@/public/SwordsBlox/Cutlass.png'
import Dark_Blade from '@/public/SwordsBlox/Dark_Blade.png'
import Dark_Dagger from '@/public/SwordsBlox/Dark_Dagger.png'
import Dragon_Trident from '@/public/SwordsBlox/Dragon_Trident.png'
import Dual_Headed_Blade from '@/public/SwordsBlox/Dual_Headed_Blade.png'
import Dual_Katana from '@/public/SwordsBlox/Dual_Katana.png'
import Fox_Lamp from '@/public/SwordsBlox/Fox_Lamp.png'
import Gravity_Cane from '@/public/SwordsBlox/Gravity_Cane.png'
import Hallow_Scythe from '@/public/SwordsBlox/Hallow_Scythe.png'
import Iron_Mace from '@/public/SwordsBlox/Iron_Mace.png'
import Jitte from '@/public/SwordsBlox/Jitte.png'
import Katana from '@/public/SwordsBlox/Katana.png'
import Koko from '@/public/SwordsBlox/Koko.png'
import Longsword from '@/public/SwordsBlox/Longsword.png'
import Midnight_Blade from '@/public/SwordsBlox/Midnight_Blade.png'
import Pipe from '@/public/SwordsBlox/Pipe.png'
import Pole_1 from '@/public/SwordsBlox/Pole_1.png'
import Pole_2 from '@/public/SwordsBlox/Pole_2.png'
import Rengoku from '@/public/SwordsBlox/Rengoku.png'
import Saber from '@/public/SwordsBlox/Saber.png'
import Saddi from '@/public/SwordsBlox/Saddi.png'
import Shark_Anchor from '@/public/SwordsBlox/Shark_Anchor.png'
import Shark_Saw from '@/public/SwordsBlox/Shark_Saw.png'
import Shisui from '@/public/SwordsBlox/Shisui.png'
import Soul_Cane from '@/public/SwordsBlox/Soul_Cane.png'
import Spikey_Trident from '@/public/SwordsBlox/Spikey_Trident.png'
import Trident from '@/public/SwordsBlox/Trident.png'
import Triple_Dark_Blade from '@/public/SwordsBlox/Triple_Dark_Blade.png'
import True_Triple_Katana from '@/public/SwordsBlox/True_Triple_Katana.png'
import Tushita from '@/public/SwordsBlox/Tushita.png'
import Twin_Hooks from '@/public/SwordsBlox/Twin_Hooks.png'
import Wando from '@/public/SwordsBlox/Wando.png'
import Warden_Sword from '@/public/SwordsBlox/Warden_Sword.png'
import Yama from '@/public/SwordsBlox/Yama.png'
// Weapons
import Acidum_rifle from '@/public/GunsBlox/Acidum_rifle.png'
import Bazooka from '@/public/GunsBlox/Bazooka.png'
import Bizarre_Rifle from '@/public/GunsBlox/Bizarre_Rifle.png'
import Cannon from '@/public/GunsBlox/Cannon.png'
import Flintlock from '@/public/GunsBlox/Flintlock.png'
import Kabucha from '@/public/GunsBlox/Kabucha.png'
import Musket from '@/public/GunsBlox/Musket.png'
import Refined_Flintlock from '@/public/GunsBlox/Refined_Flintlock.png'
import Refined_Musket from '@/public/GunsBlox/refined_Musket.png'
import Refined_Slingshot from '@/public/GunsBlox/Refined_Slingshot.png'
import Serpent_Bow from '@/public/GunsBlox/Serpent_Bow.png'
import Slingshot from '@/public/GunsBlox/Slingshot.png'
import Soul_Guitar from '@/public/GunsBlox/Soul_Guitar.png'
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormState } from '../FormContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ComboForm() {

  const { onHandleNext, setFormData, formData } = useFormState();

  const FormSchema = z.object({
    fightingstyle: z
      .string()
      .min(1, 'Please select a fighting style'),
    weapon: z
      .string()
      .min(1, 'Please select a weapon'),
    fruit: z
      .string()
      .min(1, 'Please select a fruit'),
    sword: z
      .string()
      .min(1, 'Please select a sword'),
  })

  type InputType = z.infer<typeof FormSchema>

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData
  })

  const submitCombo: SubmitHandler<InputType> = (data) => {
    setFormData((prevFormData) => ({...prevFormData, ...data}));
    onHandleNext();
  };

  const Fruits = [
    {FruitName: "Shadow", FruitImg: Shadow},
    {FruitName: "Sound", FruitImg: Sound},
    {FruitName: "Dragon", FruitImg: Dragon},
    {FruitName: "Spirit", FruitImg: Spirit},
    {FruitName: "Chop", FruitImg: Chop},
    {FruitName: "Dark", FruitImg: Dark},
    {FruitName: "Ice", FruitImg: Ice},
    {FruitName: "Dough", FruitImg: Dough},
    {FruitName: "Venom", FruitImg: Venom},
    {FruitName: "Light", FruitImg: Light},
    {FruitName: "Magma", FruitImg: Magma},
    {FruitName: "Buddha", FruitImg: Buddha},
    {FruitName: "Blizzard", FruitImg: Blizzard},
    {FruitName: "Smoke", FruitImg: Smoke},
    {FruitName: "Quake", FruitImg: Quake},
    {FruitName: "Kitsune", FruitImg: Kitsune},
    {FruitName: "TRex", FruitImg: TRex},
    {FruitName: "Mammoth", FruitImg: Mammoth},
    {FruitName: "Love", FruitImg: Love},
    {FruitName: "Spider", FruitImg: Spider},
    {FruitName: "Falcon", FruitImg: Falcon},
    {FruitName: "Rubber", FruitImg: Rubber},
    {FruitName: "Phoenix", FruitImg: Phoenix},
    {FruitName: "Leopard", FruitImg: Leopard},
    {FruitName: "Bomb", FruitImg: Bomb},
    {FruitName: "Spike", FruitImg: Spike},
    {FruitName: "Portal", FruitImg: Portal},
    {FruitName: "Rumble", FruitImg: Rumble},
    {FruitName: "Gravity", FruitImg: Gravity},
    {FruitName: "Ghost", FruitImg: Ghost},
    {FruitName: "Barrier", FruitImg: Barrier},
    {FruitName: "Flame", FruitImg: Flame},
    {FruitName: "Pain", FruitImg: Pain},
    {FruitName: "Diamond", FruitImg: Diamond},
    {FruitName: "Control", FruitImg: Control},
  ]

  const FightingStyles = [
    {FightingStyleName: "Superhuman", FightingStyleImg: Super_Human},
    {FightingStyleName: "Sharkman Karate", FightingStyleImg: Sharkman_Karate},
    {FightingStyleName: "Water Kung Fu", FightingStyleImg: Water_Kung_Fu},
    {FightingStyleName: "Dark Step", FightingStyleImg: Dark_Step},
    {FightingStyleName: "Death Step", FightingStyleImg: Death_Step},
    {FightingStyleName: "Dragon Breath", FightingStyleImg: Dragon_Breath},
    {FightingStyleName: "Dragon Talon", FightingStyleImg: Dragon_Talon},
    {FightingStyleName: "Godhuman", FightingStyleImg: Godhuman},
    {FightingStyleName: "Electric", FightingStyleImg: Eletric},
    {FightingStyleName: "Electric Claw", FightingStyleImg: Eletric_Claw},
    {FightingStyleName: "Sanguine Art", FightingStyleImg: Sanguine_Art},
    {FightingStyleName: "Combat", FightingStyleImg: Combat},
  ]

  const Swords = [
    {SwordName: "Bisento", SwordImg: Bisento},
    {SwordName: "Triple Katana", SwordImg: True_Triple_Katana},
    {SwordName: "Buddy Sword", SwordImg: Buddy_Sword},
    {SwordName: "Canvander", SwordImg: Canvander},
    {SwordName: "Wando", SwordImg: Wando},
    {SwordName: "Cursed Dual Katana", SwordImg: Cursed_Dual_Katana},
    {SwordName: "Cutlass", SwordImg: Cutlass},
    {SwordName: "Dark Blade", SwordImg: Dark_Blade},
    {SwordName: "Dark Dagger", SwordImg: Dark_Dagger},
    {SwordName: "Dragon Trident", SwordImg: Dragon_Trident},
    {SwordName: "Rengoku", SwordImg: Rengoku},
    {SwordName: "Soul Cane", SwordImg: Soul_Cane},
    {SwordName: "Pole 2nd Form", SwordImg: Pole_2},
    {SwordName: "Tushita", SwordImg: Tushita},
    {SwordName: "Yama", SwordImg: Yama},
    {SwordName: "Saber", SwordImg: Saber},
    {SwordName: "Shisui", SwordImg: Shisui},
    {SwordName: "Shark Anchor", SwordImg: Shark_Anchor},
    {SwordName: "Jitte", SwordImg: Jitte},
    {SwordName: "Katana", SwordImg: Katana},
    {SwordName: "Longsword", SwordImg: Longsword},
    {SwordName: "Twin Hooks", SwordImg: Twin_Hooks},
    {SwordName: "Hallow Scythe", SwordImg: Hallow_Scythe},
    {SwordName: "Trident", SwordImg: Trident},
    {SwordName: "Spikey Trident", SwordImg: Spikey_Trident},
    {SwordName: "Triple Dark Blade", SwordImg: Triple_Dark_Blade},
    {SwordName: "Warden Sword", SwordImg: Warden_Sword},
    {SwordName: "Shark Saw", SwordImg: Shark_Saw},
    {SwordName: "Saddi", SwordImg: Saddi},
    {SwordName: "Pipe", SwordImg: Pipe},
    {SwordName: "Pole 1st Form", SwordImg: Pole_1},
    {SwordName: "Koko", SwordImg: Koko},
    {SwordName: "Midnight Blade", SwordImg: Midnight_Blade},
    {SwordName: "Dual Headed Blade", SwordImg: Dual_Headed_Blade},
    {SwordName: "Iron Mace", SwordImg: Iron_Mace},
    {SwordName: "Gravity_Cane", SwordImg: Gravity_Cane},
    {SwordName: "Fox Lamp", SwordImg: Fox_Lamp},
    {SwordName: "Dual Katana", SwordImg: Dual_Katana},
  ]

  const Weapons = [
    {WeaponName: "Serpent Bow", WeaponImg: Serpent_Bow},
    {WeaponName: "Refined Slingshot", WeaponImg: Refined_Slingshot},
    {WeaponName: "Refined Musket", WeaponImg: Refined_Musket},
    {WeaponName: "Soul Guitar", WeaponImg: Soul_Guitar},
    {WeaponName: "Slingshot", WeaponImg: Slingshot},
    {WeaponName: "Acidum Rifle", WeaponImg: Acidum_rifle},
    {WeaponName: "Kabucha", WeaponImg: Kabucha},
    {WeaponName: "Bizarre Rifle", WeaponImg: Bizarre_Rifle},
    {WeaponName: "Cannon", WeaponImg: Cannon},
    {WeaponName: "Flintlock", WeaponImg: Flintlock},
    {WeaponName: "Bazooka", WeaponImg: Bazooka},
    {WeaponName: "Musket", WeaponImg: Musket},
    {WeaponName: "Refined Flintlock", WeaponImg: Refined_Flintlock},
  ]

  const fruitRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLDivElement>(null);
  const swordRef = useRef<HTMLDivElement>(null);
  const weaponRef = useRef<HTMLDivElement>(null);
  const [styleValue, setStyleValue] = useState("");
  const [fruitValue, setFruitValue] = useState("");
  const [swordValue, setSwordValue] = useState("");
  const [weaponValue, setWeaponValue] = useState("");
  const [styleMenu, setStyleMenu] = useState(false);
  const [fruitMenu, setFruitMenu] = useState(false);
  const [swordMenu, setSwordMenu] = useState(false);
  const [weaponMenu, setWeaponMenu] = useState(false);
  const [selectedFruit, setSelectedFruit] = useState("");
  const [selectedSword, setSelectedSword] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  useEffect(() => {
    let StyleClickOutside = (e: MouseEvent) => {
     if (typeof window !== 'undefined' && styleRef.current && !styleRef.current.contains(e.target as Node)) {
        setStyleMenu(false);
      }
    }

    let FruitClickOutside = (e: MouseEvent) => {
      if (typeof window !== 'undefined' && fruitRef.current && !fruitRef.current.contains(e.target as Node)) {
        setFruitMenu(false);
      }
    }

    let SwordClickOutside = (e: MouseEvent) => {
      if (typeof window !== 'undefined' && swordRef.current && !swordRef.current.contains(e.target as Node)) {
        setSwordMenu(false);
      }
    }

    let WeaponClickOutside = (e: MouseEvent) => {
      if (typeof window !== 'undefined' && weaponRef.current && !weaponRef.current.contains(e.target as Node)) {
        setWeaponMenu(false);
      }
    }
        
    window.addEventListener("mousedown", StyleClickOutside);
    window.addEventListener("mousedown", FruitClickOutside);
    window.addEventListener("mousedown", SwordClickOutside);
    window.addEventListener("mousedown", WeaponClickOutside);
    
    return () => {
      window.removeEventListener("mousedown", StyleClickOutside);
      window.removeEventListener("mousedown", FruitClickOutside);
      window.removeEventListener("mousedown", SwordClickOutside);
      window.removeEventListener("mousedown", WeaponClickOutside);
    };
  }, [styleRef, fruitRef, swordRef, weaponRef]);

  const FightingStylesMenu = () => {
    setStyleMenu(!styleMenu);
  }
  const FruitsMenu = () => {
    setFruitMenu(!fruitMenu);
  }
  const SwordMenu = () => {
    setSwordMenu(!swordMenu);
  }
  const WeaponMenu = () => {
    setWeaponMenu(!weaponMenu);
  }


  const handleStyleSelect = (imageSrc: string) => {
    setSelectedStyle(imageSrc);
    setValue("fightingstyle", imageSrc);
    setStyleMenu(false);
  }

  const handleFruitSelect = (styleSrc: string) => {
    setSelectedFruit(styleSrc);
    setValue("fruit", styleSrc);
    setFruitMenu(false);
  }
    
  const handleSwordSelect = (swordSrc: string) => {
    setSelectedSword(swordSrc);
    setValue("sword", swordSrc);
    setSwordMenu(false);
  }

  const handleWeaponSelect = (weaponSrc: string) => {
    setSelectedWeapon(weaponSrc);
    setValue("weapon", weaponSrc);
    setWeaponMenu(false);
  }

  const customStyles = {
    gridImage: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    }
  };

  return (
    <div className='grid place-items-center p-2 petit:mt-[35px]'>
      <div className='bg-stone-50 dark:bg-zinc-800 p-5 w-full tiny:max-w-[400px] sm:max-w-[400px] md:max-w-[400px] border-t-4 border-[#3d95ec] rounded-lg'>
        <h1 className=''>
          Combo Creation
        </h1>
        <form onSubmit={handleSubmit(submitCombo)} className="mt-[15px]">
          <div className='grid grid-cols-2 petit:grid-cols-4 petit:gap-[15px] gap-y-[15px]'>
            <div ref={styleRef} className='relative'>
              <div onClick={FightingStylesMenu} className='flex justify-center'>
                <div className={`${!styleMenu ? 'hidden' : 'styleMenuUpArrow absolute top-[87px] petit:top-[62px] tiny:top-[80px]'}`}></div>
                <Image
                  className='border-1 border-gray-300 cursor-pointer transition-all hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg'
                  src={selectedStyle || formData.fightingstyle || PlusIcon}
                  width={90}
                  height={90}
                  alt=""
                />
              </div>
              <div className={`styleDropDownCombo top-[95px] petit:top-[70px] tiny:top-[88px] p-[7px] petit:left-[-20px] left-[-20px] w-[270px] petit:w-[340px] shadow-lg ${!styleMenu && 'hidden'}`}>
                <div className='text-black mb-[5px]'>
                  <Input
                    className='text-white border-1 border-white'
                    placeholder='Search for fighting styles'
                    value={styleValue}
                    onChange={(e) => setStyleValue(e.target.value.toLowerCase())}
                    type="text"
                  />
                </div>
                  <ul className='grid grid-cols-6 gap-y-[5px] md:gap-y-[5px] md:gap-x-[5px]'>
                    <>
                    {FightingStyles?.map((style) => (
                      <li
                        key={style.FightingStyleName}
                        onClick={() => handleStyleSelect(style.FightingStyleImg.src)}
                        className={`w-[37px] h-[37px] petit:w-[45px] petit:h-[45px] tiny:w-[45px] tiny:h-[45px] hover:bg-gray-500
                        border border-[#fff] cursor-pointer
                        ${style.FightingStyleName.toLowerCase().includes(styleValue) ? 'block' : 'hidden'}
                        ${style.FightingStyleImg.src === selectedStyle ? 'bg-gray-500' : ''} transition-all`}
                      >
                        <Image {...register("fightingstyle")} alt='' src={style.FightingStyleImg} />
                      </li>
                    ))}
                    </>
                </ul>
              </div>
            </div>
            <div ref={fruitRef} className='relative'>
              <div onClick={FruitsMenu} className='flex justify-center'>
                <div className={`${!fruitMenu ? 'hidden' : 'styleMenuUpArrow absolute top-[87px] petit:top-[62px] tiny:top-[80px]'}`}></div>
                <Image
                  className='border-1 border-gray-300 cursor-pointer transition-all hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg'
                  src={selectedFruit || formData.fruit || PlusIcon}
                  width={90}
                  height={90}
                  alt=""
                />
              </div>
              <div className={`fruitDropDownCombo top-[95px] petit:top-[70px] tiny:top-[88px] p-[7px] petit:left-[-100px] tiny:left-[-80px] left-[-135px] w-[270px] petit:w-[340px] shadow-lg ${!fruitMenu && 'hidden'}`}>
                <div className='text-black mb-[5px]'>
                  <Input
                    className='text-white border-1 border-white'
                    placeholder='Search for fruits'
                    value={fruitValue}
                    onChange={(e) => setFruitValue(e.target.value.toLowerCase())}
                    type="text"
                  />
                </div>
                  <ul className='grid grid-cols-6 gap-y-[5px] md:gap-y-[10px]'>
                    <>
                    {Fruits?.map((fruit) => (
                      <li
                        key={fruit.FruitName}
                        onClick={() => handleFruitSelect(fruit.FruitImg.src)}
                        className={`w-[37px] h-[37px] petit:w-[45px] petit:h-[45px] tiny:w-[45px] tiny:h-[45px] hover:bg-gray-500
                        border border-[#fff] cursor-pointer
                        ${fruit.FruitName.toLowerCase().includes(fruitValue) ? 'block' : 'hidden'}
                        ${fruit.FruitImg.src === selectedFruit ? 'bg-gray-500' : ''} transition-all`}
                      >
                        <Image {...register("fruit")} alt='' src={fruit.FruitImg} />
                      </li>
                    ))}
                    </>
                </ul>
              </div>
            </div>
            <div ref={swordRef} className='relative'>
              <div onClick={SwordMenu} className='flex justify-center'>
                <div className={`${!swordMenu ? 'hidden' : 'styleMenuUpArrow absolute top-[87px] petit:top-[62px] tiny:top-[80px]'}`}></div>
                <Image
                  className='border-1 border-gray-300 cursor-pointer transition-all hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg'
                  src={selectedSword || formData.sword || PlusIcon}
                  width={90}
                  height={90}
                  alt=""
                />
              </div>
              <div className={`swordDropDownCombo top-[95px] petit:top-[70px] tiny:top-[88px] p-[7px] petit:left-[-178px] tiny:left-[-195px] left-[-23px] w-[270px] petit:w-[340px] tiny:w-[380px] shadow-lg ${!swordMenu && 'hidden'}`}>
                <div className='text-black mb-[5px]'>
                  <Input
                    className='text-white border-1 border-white'
                    placeholder='Search for swords'
                    value={swordValue}
                    onChange={(e) => setSwordValue(e.target.value.toLowerCase())}
                    type="text"
                  />
                </div>
                  <ul className='grid grid-cols-7 gap-y-[5px] md:gap-y-[7px] md:gap-x-[10px]'>
                    <>
                    {Swords?.map((sword) => (
                      <li
                        key={sword.SwordName}
                        onClick={() => handleSwordSelect(sword.SwordImg.src)}
                        className={`w-[37px] h-[37px] petit:w-[45px] petit:h-[45px] tiny:w-[45px] tiny:h-[45px] hover:bg-gray-500
                        border border-[#fff] cursor-pointer
                        ${sword.SwordName.toLowerCase().includes(swordValue) ? 'block' : 'hidden'}
                        ${sword.SwordImg.src === selectedSword ? 'bg-gray-500' : ''} transition-all`}
                      >
                        <Image {...register("sword")} alt='' src={sword.SwordImg} />
                      </li>
                    ))}
                    </>
                </ul>
              </div>
            </div>
            <div ref={weaponRef} className='relative'>
              <div onClick={WeaponMenu} className='flex justify-center'>
                <div className={`${!weaponMenu ? 'hidden' : 'styleMenuUpArrow absolute top-[87px] petit:top-[62px] tiny:top-[80px]'}`}></div>
                <Image
                  className='border-1 border-gray-300 cursor-pointer transition-all hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg'
                  src={selectedWeapon || formData.weapon || PlusIcon}
                  width={90}
                  height={90}
                  alt=""
                />
              </div>
              <div className={`gunDropDownCombo top-[95px] petit:top-[70px] tiny:top-[88px] p-[7px] petit:left-[-255px] tiny:left-[-260px] left-[-135px] w-[270px] petit:w-[340px] shadow-lg ${!weaponMenu && 'hidden'}`}>
                <div className='text-black mb-[5px]'>
                  <Input
                    className='text-white border-1 border-white'
                    placeholder='Search for fruits'
                    value={weaponValue}
                    onChange={(e) => setWeaponValue(e.target.value.toLowerCase())}
                    type="text"
                  />
                </div>
                  <ul className='grid grid-cols-6 gap-y-[5px] md:gap-y-[5px] md:gap-x-[5px]'>
                    <>
                    {Weapons?.map((weapon) => (
                      <li
                        key={weapon.WeaponName}
                        onClick={() => handleWeaponSelect(weapon.WeaponImg.src)}
                        className={`w-[37px] h-[37px] petit:w-[45px] petit:h-[45px] tiny:w-[45px] tiny:h-[45px] hover:bg-gray-500
                        border border-[#fff] cursor-pointer
                        ${weapon.WeaponName.toLowerCase().includes(weaponValue) ? 'block' : 'hidden'}
                        ${weapon.WeaponImg.src === selectedWeapon ? 'bg-gray-500' : ''} transition-all`}
                      >
                        <Image {...register("weapon")} alt='' src={weapon.WeaponImg} />
                      </li>
                    ))}
                    </>
                </ul>
              </div>
            </div>
          </div>
          <div className='flex justify-end mt-[15px] mr-[12px] petit:mr-0'>
            <Button type='submit' className='bg-[#3d95ec] h-[40px] text-white hover:bg-[#386da1] rounded-md'>
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}