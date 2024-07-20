"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlusMore from "@/public/Icons/PlusIcon2.png";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import { isWebUri } from "valid-url";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, XCircleIcon, PencilIcon, Pencil, ArrowRight } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import ComboVideo from "../HtmlComponents/ComboVideo";
import { createComboAction } from "@/lib/actions/comboActions";
import Image from "next/image";
import { BloxFruitImages } from "@/BloxFruitImages";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { useLocale } from "@/LocaleContext";

const FormSchema = z.object({
  fruit: z.string().min(1, "Please select a fruit"),
  fightingstyle: z.string().min(1, "Please select a fighting style"),
  sword: z.string().min(1, "Please select a sword"),
  weapon: z.string().min(1, "Please select a weapon"),
  combotitle: z.string().min(1, "Please enter a combo name"),
  combodescription: z
    .string()
    .max(1000, "Description must be less than 1000 characters"),
  specialty: z.string(),
  race: z.string(),
  mainStats: z.string(),
  comboVideo: z.string(),
  difficulty: z.string(),
});

type InputForm = z.infer<typeof FormSchema>;

type Props = {
  UserMaxComboCountReached: number;
  user: any;
}

export default function AnotherCreateCombo({ UserMaxComboCountReached, user }: Props) {
  const [selectedFightingStyle, setSelectedFightingStyle] = useState("");
  const [selectedWeapon, setSelectedWeapon] = useState("");
  const [selectedSword, setSelectedSword] = useState("");
  const [selectedFruit, setSelectedFruit] = useState("");

  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedMainStats, setSelectedMainStats] = useState("");


  const pathName = usePathname();
  const [videoUrl, setVideoUrl] = useState("");
  const [isWMV, setIsWMV] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditting = () => setIsEditing((prevIsEditing) => !prevIsEditing);

  const form = useForm<InputForm>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      combotitle: "",
      combodescription: "",
      fruit: selectedFruit,
      fightingstyle: selectedFightingStyle,
      sword: selectedSword,
      weapon: selectedWeapon,
      specialty: selectedSpecialty,
      race: "",
      mainStats: selectedMainStats,
      comboVideo: "",
      difficulty: selectedDifficulty,
    },
  });

  const [comboVideo, setComboVideo] = useState<string | undefined>(
    form.getValues("comboVideo")
  );

  const ComboSpecialtys = [
    {
      specialty: "PVP",
    },
    {
      specialty: "PVE",
    },
    {
      specialty: "Grind",
    },
  ];

  const ComboDifficulties = [
    {
      difficulty: "Hard",
    },
    {
      difficulty: "Medium",
    },
    {
      difficulty: "No skill",
    },
  ];

  const ComboMainStats = [
    {
      Stats: "Main Fruit",
    },
    {
      Stats: "Main Sword",
    },
    {
      Stats: "Main Gun",
    },
    {
      Stats: "Hybrid",
      padding: true,
    },
  ];

  const handleSpecialtyChange = (e: React.FormEvent<HTMLInputElement>) => {
    form.setValue("specialty", e.currentTarget.value);
    setSelectedSpecialty(e.currentTarget.value);
  };

  const handleMainStatsChange = (e: React.FormEvent<HTMLInputElement>) => {
    form.setValue("mainStats", e.currentTarget.value);
    setSelectedMainStats(e.currentTarget.value);
  };

  const handleDifficultyChange = (e: React.FormEvent<HTMLInputElement>) => {
    form.setValue("difficulty", e.currentTarget.value);
    setSelectedDifficulty(e.currentTarget.value);
  };

  const [isValidUrl, setIsValidUrl] = useState(true);

  const handleVideoUpload = (url: string) => {
    if (isWebUri(videoUrl)) {
      setIsValidUrl(true);
      form.setValue("comboVideo", url);
      setComboVideo(url);
      setVideoUrl(url);
    } else {
      setIsValidUrl(false);
      return; // Don't proceed if URL is invalid
    }
  };

  const createCombo: SubmitHandler<InputForm> = async (FormData) => {
    try {
      const result = await createComboAction(FormData, pathName);
      console.log("Form submission ended with result:", result);
      window.location.reload();
    } catch (error) {
      console.error("Form submission error:", error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div>
      <Form {...form}>
        <Tabs defaultValue="combo" className="max-w-2xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="combo">Combo</TabsTrigger>
            <TabsTrigger value="information">Information</TabsTrigger>
          </TabsList>
          <TabsContent value="combo">
            <Card>
              <CardHeader>
                <CardTitle>Combo Build</CardTitle>
                <CardDescription>
                  Build <span className="font-semibold">your</span> combo here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2 max-w-[400px]">
                  {/* Fighting Styles */}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                      <div
                        className={`relative ${
                          !selectedFightingStyle ? "dark:invert" : ""
                        } rounded-md cursor-pointer group w-full`}
                      >
                        <Image
                          alt={""}
                          fetchPriority="high"
                          src={selectedFightingStyle || PlusMore.src}
                          className={`border rounded-md`}
                          width={140}
                          height={140}
                        />
                        <div className="absolute inset-0 bg-black/40 dark:bg-black opacity-0 group-hover:opacity-50 rounded-md transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Pencil className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="start">
                      <div className="grid petitmax:grid-cols-4 petit:grid-cols-5 tiny:grid-cols-6 tiny420px:grid-cols-7 gap-2">
                        {BloxFruitImages["Fighting Styles"] &&
                          Object.entries(
                            BloxFruitImages["Fighting Styles"]
                          ).map(([style, image]) => (
                            <div
                              key={style}
                              className={`relative rounded-md cursor-pointer ${
                                image.src === selectedFightingStyle
                                  ? "gradient-border animate-in"
                                  : ""
                              }
                                  border dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150`}
                              onClick={() => {
                                setSelectedFightingStyle(image.src);
                                form.setValue("fightingstyle", image.src);
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
                          ))}
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* Fruits */}
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                      <div
                        className={`relative ${
                          !selectedFruit ? "dark:invert" : ""
                        } rounded-md cursor-pointer group w-full`}
                      >
                        <Image
                          alt={
                            selectedFruit.split("/")[
                              selectedFruit.split("/").length - 1
                            ]
                          }
                          fetchPriority="high"
                          src={selectedFruit || PlusMore.src}
                          className={`border rounded-md`}
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
                                className={`relative rounded-md cursor-pointer ${
                                  image.src === selectedFruit
                                    ? "gradient-border animate-in"
                                    : ""
                                }
                                  border dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150`}
                                onClick={() => {
                                  setSelectedFruit(image.src);
                                  form.setValue("fruit", image.src);
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
                      <div
                        className={`relative ${
                          !selectedSword ? "dark:invert" : ""
                        } rounded-md cursor-pointer group w-full`}
                      >
                        <Image
                          alt="Fighting Style"
                          fetchPriority="high"
                          src={selectedSword || PlusMore.src}
                          className={`border rounded-md`}
                          width={140}
                          height={140}
                        />
                        <div className="absolute inset-0 bg-black/40 dark:bg-black opacity-0 group-hover:opacity-50 rounded-md transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Pencil className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="center">
                      <div className="grid petitmax:grid-cols-5 petit:grid-cols-6 tiny420px:grid-cols-7 gap-1 petit:gap-2">
                        {BloxFruitImages["Swords"] &&
                          Object.entries(BloxFruitImages["Swords"]).map(
                            ([style, image]) => (
                              <div
                                key={style}
                                className={`relative rounded-md cursor-pointer ${
                                  image.src === selectedSword
                                    ? "gradient-border animate-in"
                                    : ""
                                }
                                  border dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150`}
                                onClick={() => {
                                  setSelectedSword(image.src);
                                  form.setValue("sword", image.src);
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
                      <div
                        className={`relative ${
                          !selectedWeapon ? "dark:invert" : ""
                        } rounded-md cursor-pointer group w-full`}
                      >
                        <Image
                          alt="weapon"
                          fetchPriority="high"
                          src={selectedWeapon || PlusMore.src}
                          className={`border rounded-md`}
                          width={140}
                          height={140}
                        />
                        <div className="absolute inset-0 bg-black/40 dark:bg-black opacity-0 group-hover:opacity-50 rounded-md transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Pencil className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end">
                      <div className="grid grid-cols-5 petit:grid-cols-6 tiny420px:grid-cols-7 gap-1 petit:gap-2">
                        {BloxFruitImages["Weapons"] &&
                          Object.entries(BloxFruitImages["Weapons"]).map(
                            ([style, image]) => (
                              <div
                                key={style}
                                className={`relative rounded-md cursor-pointer ${
                                  image.src === selectedWeapon
                                    ? "gradient-border animate-in"
                                    : ""
                                }
                                  border dark:hover:bg-white/20 hover:bg-slate-200 ease-in-out duration-150`}
                                onClick={() => {
                                  setSelectedWeapon(image.src);
                                  form.setValue("weapon", image.src);
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="information">
            <Card>
              <CardHeader>
                <CardTitle>Combo Form</CardTitle>
                <CardDescription>
                  Fill all information here. After saving, you can edit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(createCombo)}>
                  <input
                    type="hidden"
                    name="race"
                    value={form.getValues("race")}
                  />
                  <input
                    type="hidden"
                    name="difficulty"
                    value={form.getValues("difficulty")}
                  />
                  <input
                    type="hidden"
                    name="specialty"
                    value={form.getValues("specialty")}
                  />
                  <input
                    type="hidden"
                    name="mainStats"
                    value={form.getValues("mainStats")}
                  />
                  <input
                    type="hidden"
                    name="fruit"
                    value={form.getValues("fruit")}
                  />
                  <input
                    type="hidden"
                    name="fightingstyle"
                    value={form.getValues("fightingstyle")}
                  />
                  <input
                    type="hidden"
                    name="sword"
                    value={form.getValues("sword")}
                  />
                  <input
                    type="hidden"
                    name="weapon"
                    value={form.getValues("weapon")}
                  />
                  <input
                    type="hidden"
                    name="comboVideo"
                    value={form.getValues("comboVideo")}
                  />
                  <div className="flex flex-col gap-[10px]">
                    <FormField
                      control={form.control}
                      name="combotitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Combo Title"
                              className="w-full border dark:border-white outline-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="combodescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TextareaAutosize
                              {...field}
                              className="w-full p-3 bg-transparent border border-input dark:border-white outline-black rounded-lg"
                              placeholder="Combo Description"
                              minRows={5}
                              maxRows={7}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <Select
                      defaultValue={form.getValues("race")}
                      onValueChange={(value) => form.setValue("race", value)}
                    >
                      <SelectTrigger className="dark:border-white">
                        <SelectValue placeholder="Select a race" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Races:</SelectLabel>
                          <SelectItem value="Skypian">Skypian</SelectItem>
                          <SelectItem value="Mink">Mink</SelectItem>
                          <SelectItem value="Fishman">Fishman</SelectItem>
                          <SelectItem value="Cyborg">Cyborg</SelectItem>
                          <SelectItem value="Human">Human</SelectItem>
                          <SelectItem value="Ghoul">Ghoul</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div>
                      <div className="flex justify-between items-center">
                        <label className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Combo Video:
                        </label>
                        <button
                          onClick={toggleEditting}
                          type="button"
                          className="text-sm flex items-center gap-[5px]"
                        >
                          {isEditing ? (
                            <div className="flex gap-[3px] items-center">
                              <XCircleIcon className="size-4" /> Cancel
                            </div>
                          ) : (
                            <div className="flex gap-[3px] items-center">
                              {!comboVideo ? (
                                ""
                              ) : (
                                <>
                                  <PencilIcon className="size-4" />
                                  Edit Video
                                </>
                              )}
                            </div>
                          )}
                        </button>
                      </div>
                      {!isEditing &&
                        (!comboVideo ? (
                          <div className="flex text-sm items-center justify-center h-10 bg-slate-200 dark:bg-zinc-600 rounded-md">
                            <button
                              className="flex gap-[5px]"
                              type="button"
                              onClick={toggleEditting}
                            >
                              <PlusCircle className="size-5" /> Add video here
                            </button>
                          </div>
                        ) : (
                          <ComboVideo comboVideo={comboVideo} />
                        ))}
                      {isEditing && (
                        <div className="border border-input rounded-lg p-2 dark:border-white">
                          <UploadButton
                            endpoint="comboVideo"
                            onClientUploadComplete={(res) => {
                              // Do something with the response
                              console.log("Files: ", res);
                              if (res[0].url.endsWith(".wmv")) {
                                setIsWMV(true);
                                return;
                              }
                              setComboVideo(res[0].url);
                              toggleEditting();
                              form.setValue("comboVideo", res[0].url);
                            }}
                            onUploadError={(error: Error) => {
                              // Do something with the error.
                              toast.error(`error uploading video`);
                            }}
                          />
                          {isWMV && (
                            <p className="text-sm text-red-500">
                              Note: WMV videos are not supported.
                            </p>
                          )}
                          <Separator className="my-2 dark:bg-white" />
                          <p className="text-sm">Or by URL:</p>
                          <div className="flex gap-[5px] items-center">
                            <Input
                              className="border dark:border-white"
                              type="text"
                              value={videoUrl}
                              onChange={(e) => setVideoUrl(e.target.value)}
                              placeholder="Enter YouTube video URL"
                            />
                            <Button
                              type="button"
                              onClick={() => handleVideoUpload(videoUrl)}
                            >
                              Play
                            </Button>
                          </div>
                          {!isValidUrl && (
                            <p className="text-red-500 text-sm">
                              Please enter a valid URL.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm">Combo Difficulty:</h3>
                    <ul
                      className="items-center w-full text-sm font-medium border rounded-lg grid grid-cols-3 petit:flex
                      bg-gray-900 border-gray-600 text-white"
                    >
                      {ComboDifficulties.map((difficulty) => (
                        <li
                          key={difficulty.difficulty}
                          className="w-full border-b petit:border-b-0 border-r border-gray-600"
                        >
                          <div className="flex items-center ps-3">
                            <input
                              id={difficulty.difficulty}
                              type="radio"
                              value={difficulty.difficulty}
                              onChange={handleDifficultyChange}
                              checked={
                                selectedDifficulty === difficulty.difficulty
                              }
                              name="list-difficulty-group"
                              className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
                            />
                            <label
                              htmlFor={difficulty.difficulty}
                              className="w-full py-3 ms-2 text-sm font-medium text-gray-300"
                            >
                              {difficulty.difficulty}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-sm">Combo Type:</h3>
                    <ul
                      className="items-center w-full text-sm font-medium border rounded-lg grid grid-cols-3 petit:flex
                      bg-gray-900 border-gray-600 text-white"
                    >
                      {ComboSpecialtys.map((specialty) => (
                        <li
                          key={specialty.specialty}
                          className="w-full border-b petit:border-b-0 border-r border-gray-600"
                        >
                          <div className="flex items-center ps-3">
                            <input
                              id={specialty.specialty}
                              type="radio"
                              value={specialty.specialty}
                              onChange={handleSpecialtyChange}
                              checked={
                                selectedSpecialty === specialty.specialty
                              }
                              name="list-specialty-group"
                              className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
                            />
                            <label
                              htmlFor={specialty.specialty}
                              className="w-full py-3 ms-2 text-sm font-medium text-gray-300"
                            >
                              {specialty.specialty}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-sm">Combo Stats:</h3>
                    <ul
                      className="items-center w-full text-sm font-medium border rounded-lg grid grid-cols-2 petit:flex
                      bg-gray-900 border-gray-600 text-white"
                    >
                      {ComboMainStats.map((mainstats) => (
                        <li
                          key={mainstats.Stats}
                          className="w-full border-b petit:border-b-0 petit:border-r border-gray-600"
                        >
                          <div className="flex items-center ps-3 ">
                            <input
                              id={mainstats.Stats}
                              type="radio"
                              value={mainstats.Stats}
                              onChange={handleMainStatsChange}
                              checked={selectedMainStats === mainstats.Stats}
                              name="list-mainstats-group"
                              className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500"
                            />
                            <label
                              htmlFor={mainstats.Stats}
                              className={`w-full py-3 ms-2 text-sm text-gray-300 ${
                                mainstats.padding === true ? "pr-[3px]" : ""
                              }`}
                            >
                              {mainstats.Stats}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-between petit:justify-end gap-[8px]"></div>
                  </div>
                  {form.formState.errors.fruit &&
                  form.formState.errors.sword &&
                  form.formState.errors.fightingstyle &&
                  form.formState.errors.weapon ? (
                    <FormMessage className="mb-2 text-red-500">
                      Please make your combo build
                    </FormMessage>
                  ) : (
                    <>
                      {form.formState.errors.fruit && (
                        <FormMessage className="mb-2 text-red-500">
                          Please select a fruit
                        </FormMessage>
                      )}
                      {form.formState.errors.fightingstyle && (
                        <FormMessage className="mb-2 text-red-500">
                          Please select a fighting style
                        </FormMessage>
                      )}
                      {form.formState.errors.sword && (
                        <FormMessage className="mb-2 text-red-500">
                          Please select a sword
                        </FormMessage>
                      )}
                      {form.formState.errors.weapon && (
                        <FormMessage className="mb-2 text-red-500">
                          Please select a weapon
                        </FormMessage>
                      )}
                    </>
                  )}
                  {user.proPack >= 1 ||
                    (user.isPlusPack === "YES" && (
                      <Button
                        className="bg-[#3d95ec] text-white hover:bg-[#5994cf]"
                        type="submit"
                      >
                        Create Combo PRO
                      </Button>
                    ))}
                  {user.starterPack === 0 &&
                  user.proPack === 0 &&
                  user.isPlusPack === "NO" &&
                  UserMaxComboCountReached >= 5 ? (
                    <LimitComboReachedDialog />
                  ) : (
                    <>
                      {user.starterPack === 0 &&
                        user.proPack === 0 &&
                        user.isPlusPack === "NO" &&
                        UserMaxComboCountReached < 5 && (
                          <Button
                            className="bg-[#3d95ec] text-white hover:bg-[#5994cf]"
                            type="submit"
                          >
                            Create Combo FREE
                          </Button>
                        )}
                    </>
                  )}
                  {user.starterPack >= 1 && UserMaxComboCountReached >= 8 ? (
                    <LimitComboReachedDialog />
                  ) : (
                    <>
                      {user.starterPack >= 1 &&
                        UserMaxComboCountReached < 8 && (
                          <Button
                            className="bg-[#3d95ec] text-white hover:bg-[#5994cf]"
                            type="submit"
                          >
                            Create Combo SP
                          </Button>
                        )}
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Form>
    </div>
  );
}

const LimitComboReachedDialog = () => {
  const router = useRouter();
  const { locale } = useLocale();
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="bg-[#3d95ec] text-white hover:bg-[#5994cf]"
          type="button"
        >
          Create Combo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <span className="font-bold text-xl">Max Combo Count Reached</span>
        </DialogHeader>
        <DialogDescription>
          Enjoying the website and want to create more combos? Check out
          our incredible pricing packs for more.
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={() => {
              router.push(`/${locale}/`)
              setTimeout(() => {
                router.push(`/${locale}/#pricing-packs`);
              }, 500);
              const element = document.getElementById("pricing-packs");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            variant={"link"}
            className="text-blue-500 gap-1"
            type="button"
          >
            Check Pricing Packs <ArrowRight className="text-blue-500" width={18} height={18} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}