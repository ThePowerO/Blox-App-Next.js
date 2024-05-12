'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import PlusIcon from "@/public/Icons/PlusIcon2.png"
// Fruits
import Shadow from "@/public/ShadowFruit.png"
import Sound from "@/public/SoundFruit.png"
import Dough from "@/public/DoughFruit.webp"
import Spirit from "@/public/SpiritFruit.webp"
import Control from "@/public/ControlFruit.webp"
import Mammoth from "@/public/MammothFruit.webp"
import Kitsune from "@/public/KitsuneFruit.webp"
import TRex from "@/public/T-RexFruit.webp"
import Buddha from "@/public/BuddhaFruit.webp"
import Gravity from "@/public/GravityFruit.webp"
import Dark from "@/public/DarkFruit.webp"
import Light from "@/public/LightFruit.webp"
import Ice from "@/public/IceFruit.webp"
import Flame from "@/public/FlameFruit.webp"
import Magma from "@/public/MagmaFruit.webp"
import Phoenix from "@/public/PhoenixFruit.webp"
import Rumble from "@/public/RumbleFruit.webp"
import Pain from "@/public/PainFruit.webp"
import Portal from "@/public/PortalFruit.webp"
import Venom from "@/public/VenomFruit.webp"
import Leopard from "@/public/LeopardFruit.webp"
import Love from "@/public/LoveFruit.webp"
import Spider from "@/public/SpiderFruit.webp"
import Blizzard from "@/public/BlizzardFruit.webp"
import Quake from "@/public/QuakeFruit.webp"
import Ghost from "@/public/GhostFruit.webp"
import Rubber from "@/public/RubberFruit.webp"
import Barrier from "@/public/BarrierFruit.webp"
import Falcon from "@/public/FalconFruit.webp"
import Spike from "@/public/SpikeFruit.webp"
import Smoke from "@/public/SmokeFruit.webp"
import Bomb from "@/public/BombFruit.webp"
import Diamond from "@/public/DiamondFruit.webp"
import Dragon from "@/public/DragonFruit.webp"
import Chop from "@/public/ChopFruit.webp"
// Fighting Styles
import Super_Human from "@/public/Superhuman.png"
import Sharkman_Karate from "@/public/Sharkman_Karate.png"
import Water_Kung_Fu from "@/public/Water_Kung_Fu.png"
import Dark_Step from "@/public/Dark_Step.png"
import Death_Step from "@/public/Death_Step.png"
import Dragon_Breath from "@/public/Dragon_Breath.png"
import Dragon_Talon from "@/public/Dragon_Talon.png"
import Godhuman from "@/public/Godhuman.png"
import Eletric from "@/public/Electric.png"
import Eletric_Claw from "@/public/Electric_Claw.png"
import Sanguine_Art from "@/public/Sanguine_Art.png"
import Combat from "@/public/Combat.png"
// Swords
import Bisento from '@/public/Bisento.png'
import Buddy_Sword from '@/public/Buddy_Sword.png'
import Canvander from '@/public/Canvander.png'
import Cursed_Dual_Katana from '@/public/Cursed_Dual_Katana.png'
import Cutlass from '@/public/Cutlass.png'
import Dark_Blade from '@/public/Dark_Blade.png'
import Dark_Dagger from '@/public/Dark_Dagger.png'
import Dragon_Trident from '@/public/Dragon_Trident.png'
import Dual_Headed_Blade from '@/public/Dual_Headed_Blade.png'
import Dual_Katana from '@/public/Dual_Katana.png'
import Fox_Lamp from '@/public/Fox_Lamp.png'
import Gravity_Cane from '@/public/Gravity_Cane.png'
import Hallow_Scythe from '@/public/Hallow_Scythe.png'
import Iron_Mace from '@/public/Iron_Mace.png'
import Jitte from '@/public/Jitte.png'
import Katana from '@/public/Katana.png'
import Koko from '@/public/Koko.png'
import Longsword from '@/public/Longsword.png'
import Midnight_Blade from '@/public/Midnight_Blade.png'
import Pipe from '@/public/Pipe.png'
import Pole_1 from '@/public/Pole_1.png'
import Pole_2 from '@/public/Pole_2.png'
import Rengoku from '@/public/Rengoku.png'
import Saber from '@/public/Saber.png'
import Saddi from '@/public/Saddi.png'
import Shark_Anchor from '@/public/Shark_Anchor.png'
import Shark_Saw from '@/public/Shark_Saw.png'
import Shisui from '@/public/Shisui.png'
import Soul_Cane from '@/public/Soul_Cane.png'
import Spikey_Trident from '@/public/Spikey_Trident.png'
import Trident from '@/public/Trident.png'
import Triple_Dark_Blade from '@/public/Triple_Dark_Blade.png'
import True_Triple_Katana from '@/public/True_Triple_Katana.png'
import Tushita from '@/public/Tushita.png'
import Twin_Hooks from '@/public/Twin_Hooks.png'
import Wando from '@/public/Wando.png'
import Warden_Sword from '@/public/Warden_Sword.png'
import Yama from '@/public/Yama.png'
// Weapons
import Acidum_rifle from '@/public/Acidum_rifle.png'
import Bazooka from '@/public/Bazooka.png'
import Bizarre_Rifle from '@/public/Bizarre_Rifle.png'
import Cannon from '@/public/Cannon.png'
import Flintlock from '@/public/Flintlock.png'
import Kabucha from '@/public/Kabucha.png'
import Musket from '@/public/Musket.png'
import Refined_Flintlock from '@/public/Refined_Flintlock.png'
import Refined_Musket from '@/public/refined_Musket.png'
import Refined_Slingshot from '@/public/Refined_Slingshot.png'
import Serpent_Bow from '@/public/Serpent_Bow.png'
import Slingshot from '@/public/Slingshot.png'
import Soul_Guitar from '@/public/Soul_Guitar.png'
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