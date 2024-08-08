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
import {
  PlusCircle,
  XCircleIcon,
  PencilIcon,
  Pencil,
  ArrowRight,
  Loader,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useLocale } from "@/LocaleContext";
import { useTranslations } from "next-intl";

type SerializedUser = {
  proPack: number;
  starterPack: number;
  isPlusPack: boolean;
};

type Props = {
  UserMaxComboCountReached: number;
  user: SerializedUser;
};

export default function CreateComboLayout({
  UserMaxComboCountReached,
  user,
}: Props) {
  const t = useTranslations("CreateComboPage");
  const t3 = useTranslations("RegisterMessages");

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

  const FormSchema = z.object({
    fruit: z.string().min(1, `${t("SelectFruitMsg")}`),
    fightingstyle: z.string().min(1, `${t("SelectFightStyleMsg")}`),
    sword: z.string().min(1, `${t("SelectSwordMsg")}`),
    weapon: z.string().min(1, `${t("SelectWeaponMsg")}`),
    combotitle: z.string().min(1, `${t("PleaseEnterAComboNameMsg")}`),
    combodescription: z
      .string()
      .max(1000, `${t("DescMustBeLessThan1000Chars")}`),
    specialty: z.string(),
    race: z.string(),
    mainStats: z.string(),
    comboVideo: z.string(),
    difficulty: z.string(),
  });
  
  type InputForm = z.infer<typeof FormSchema>;

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
      return;
    }
  };

  const createCombo: SubmitHandler<InputForm> = async (FormData) => {
    if (
      user.starterPack >= 0 &&
      user.proPack === 0 &&
      user.isPlusPack === false &&
      UserMaxComboCountReached >= 5
    ) {
      toast.error(
        `${t3("FreeTrialMessage")}`,
      );
      return;
    } else if (user.proPack >= 1 || UserMaxComboCountReached >= 0) {
      try {
        const result = await createComboAction(FormData, pathName);
        console.log("Form submission ended with result:", result);
        window.location.reload();
      } catch (error) {
        console.error("Form submission error:", error);
        // Optionally display an error message to the user
      }
    }
  };

  return (
    <section className="flex mt-[-10px] justify-center">
      <Form {...form}>
        <Tabs defaultValue="combo" className="max-w-2xl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="combo">{t("ComboTrigger")}</TabsTrigger>
            <TabsTrigger value="information">
              {t("InformationTrigger")}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="combo">
            <Card>
              <CardHeader>
                <CardTitle>{t("ComboBuild")}</CardTitle>
                <CardDescription>{t("BuildComboHere")}</CardDescription>
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
                <CardTitle>{t("ComboInfo")}</CardTitle>
                <CardDescription>{t("FillAllInfoHere")}</CardDescription>
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
                              placeholder={t("ComboTitlePlaceholder")}
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
                              placeholder={t("ComboDescPlasceholder")}
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
                        <SelectValue placeholder={t("SelectARace")} />
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
                          {t("ComboVideo")}
                        </label>
                        <button
                          onClick={toggleEditting}
                          type="button"
                          className="text-sm flex items-center gap-[5px]"
                        >
                          {isEditing ? (
                            <div className="flex gap-[3px] items-center">
                              <XCircleIcon className="size-4" /> {t("Cancel")}
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
                              <PlusCircle className="size-5" />{" "}
                              {t("AddVideoHere")}
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
                          <p className="text-sm">{t("OrByURL")}</p>
                          <div className="flex gap-[5px] items-center">
                            <Input
                              className="border dark:border-white"
                              type="text"
                              value={videoUrl}
                              onChange={(e) => setVideoUrl(e.target.value)}
                              placeholder={t("EnterYouTubeVideoURL")}
                            />
                            <Button
                              type="button"
                              onClick={() => handleVideoUpload(videoUrl)}
                            >
                              {t("Play")}
                            </Button>
                          </div>
                          {!isValidUrl && (
                            <p className="text-red-500 text-sm">
                              {t("PleaseEnterAValidURL")}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm">{t("ComboDifficulty")}</h3>
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
                    <h3 className="text-sm">{t("ComboType")}</h3>
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
                    <h3 className="text-sm">{t("ComboStats")}</h3>
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
                      {t("MakeComboBuildMsg")}
                    </FormMessage>
                  ) : (
                    <>
                      {form.formState.errors.fruit && (
                        <FormMessage className="mb-2 text-red-500">
                          {t("SelectFruitMsg")}
                        </FormMessage>
                      )}
                      {form.formState.errors.fightingstyle && (
                        <FormMessage className="mb-2 text-red-500">
                          {t("SelectFightStyleMsg")}
                        </FormMessage>
                      )}
                      {form.formState.errors.sword && (
                        <FormMessage className="mb-2 text-red-500">
                          {t("SelectSwordMsg")}
                        </FormMessage>
                      )}
                      {form.formState.errors.weapon && (
                        <FormMessage className="mb-2 text-red-500">
                          {t("SelectWeaponMsg")}
                        </FormMessage>
                      )}
                    </>
                  )}
                  {user.isPlusPack === false && user.proPack === 0 && user.starterPack >= 0 && UserMaxComboCountReached >= 5 ? (
                    <LimitComboReachedDialog />
                  ) : (
                    <>
                      {UserMaxComboCountReached >= 0 || user.proPack >= 1 ? (
                        <Button
                          disabled={!form.formState.isValid || form.formState.isSubmitting}
                          type="submit"
                          className={`w-full bg-[#3d95ec] text-white hover:bg-[#5994cf] ${
                            form.formState.isSubmitting ? "cursor-not-allowed" : ""
                          }`}
                        >
                          {form.formState.isSubmitting ? <Loader size={16} className="animate-spin" /> : `${t("CreateCombo")}`}
                        </Button>
                      ) : (
                        <>
                          {user.isPlusPack === false && user.proPack === 0 && user.starterPack >= 0 && UserMaxComboCountReached >= 5 ? (
                            <LimitComboReachedDialog />
                          ) : null}
                        </>
                      )}
                    </>
                  )}
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Form>
    </section>
  );
}

const LimitComboReachedDialog = () => {
  const t = useTranslations("CreateComboPage");
  const t2 = useTranslations("CreateComboLayout");
  const t3 = useTranslations("YourCombos");
  const router = useRouter();
  const { locale } = useLocale();
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Button
          className="bg-[#3d95ec] w-full text-white hover:bg-[#5994cf]"
          type="button"
        >
          {t("CreateCombo")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <span className="font-bold text-xl">{t2("ComboCountReached")}</span>
        </DialogHeader>
        <DialogDescription>
          {t2("DiscoverPacks")}
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={() => {
              router.push(`/${locale}/`);
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
            {t3("CheckPacks")}{" "}
            <ArrowRight className="text-blue-500" width={18} height={18} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
