"use client";

import { Check, Info, Pencil, Trophy, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useSession } from "next-auth/react";
import { Combo, User } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import ReactCrop, {
  makeAspectCrop,
  PixelCrop,
  type Crop,
} from "react-image-crop";
import { Button } from "../ui/button";
import {
  UpdateUserImgAction,
  UpdateUserNameAction,
  UserAlreadyExists,
  UserDescriptionAction,
} from "@/lib/actions/userProfileActions";
import { useTranslations } from "next-intl";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  user: User;
  combo: any;
};

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function UserContent({ user, combo }: Props) {
  const t = useTranslations("ProfilePage");
  const t2 = useTranslations("CommentSection");
  const t3 = useTranslations("RegisterMessages");

  const { data: session } = useSession();
  const currentUser = session?.user;
  const pathName = usePathname();

  const [openMobileModal, setOpenMobileModal] = useState(false);
  const [openPCModal, setOpenPCModal] = useState(false);
  const [openUserNameModal, setOpenUserNameModal] = useState(false);

  const [editingDescription, setEditingDescription] = useState(false);
  const [descriptionValue, setDescriptionValue] = useState(user?.description);

  const [crop, setCrop] = useState<Crop>();
  const [userImage, setUserImage] = useState("");
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const ImgFormSchema = z.object({
    img: z.string({
      required_error: `${t("ImageRequired")}`,
      invalid_type_error: "Invalid Image",
    }),
    userId: z.string({
      invalid_type_error: "Invalid UserId",
    }),
    pathName: z.string(),
  });

  const UserNameFormSchema = z.object({
    username: z
      .string({
        required_error: `${t("UsernameRequired")}`,
        invalid_type_error: "Invalid Username",
      })
      .max(25, `${t("TooLong")}`)
      .min(5, `${t("TooShort")}`)
      .regex(/^[a-zA-Z0-9_]+$/, `${t("AllowedCharacters")}`),
    userId: z.string({
      invalid_type_error: "Invalid UserId",
    }),
    pathName: z.string(),
  });

  const UserBioFormSchema = z.object({
    description: z
      .string({
        required_error: `${t("DescriptionRequired")}`,
        invalid_type_error: "Invalid Description",
      })
      .min(5, `${t("TooShort")}`)
      .max(350, `${t("TooLong")}`),
    userId: z.string({
      invalid_type_error: "Invalid UserId",
    }),
    pathName: z.string(),
  });

  type ImgFormType = z.infer<typeof ImgFormSchema>;
  type UserNameFormType = z.infer<typeof UserNameFormSchema>;
  type UserBioFormType = z.infer<typeof UserBioFormSchema>;

  const ImgForm = useForm<ImgFormType>({
    resolver: zodResolver(ImgFormSchema),
    defaultValues: {
      img: "",
      userId: user?.id,
      pathName: pathName,
    },
  });

  const UserNameForm = useForm<UserNameFormType>({
    resolver: zodResolver(UserNameFormSchema),
    defaultValues: {
      username: "",
      userId: user?.id,
      pathName: pathName,
    },
  });

  const UserBioForm = useForm<UserBioFormType>({
    resolver: zodResolver(UserBioFormSchema),
    defaultValues: {
      description: user.description,
      userId: user?.id,
      pathName: pathName,
    },
  });

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop | null) => {
    const canvas = canvasRef.current;
    if (!canvas || !crop || !image) {
      return null;
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  const UpdateUserImgSubmit: SubmitHandler<ImgFormType> = async (data) => {
    try {
      await UpdateUserImgAction(data);
      setUserImage("");
      ImgForm.setValue("img", "");
      setOpenPCModal(false);
      setOpenMobileModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateUserNameSubmit: SubmitHandler<UserNameFormType> = async (
    data
  ) => {
    try {
      const userAlreadyExists = await UserAlreadyExists(data.username);
      if (userAlreadyExists) {
        return UserNameForm.setError("username", {
          message: t3("FreeTrialMessage"),	
        })
      }
      await UpdateUserNameAction(data);
      UserNameForm.setValue("username", "");
      setOpenUserNameModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const UserDescriptionSubmit: SubmitHandler<UserBioFormType> = async (data) => {
    try {
      await UserDescriptionAction(data);
      UserBioForm.setValue("description", "");
      setEditingDescription(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex justify-center mb-2">
        {currentUser?.id === user?.id ? (
          <Form {...ImgForm}>
            <Dialog open={openMobileModal} onOpenChange={setOpenMobileModal}>
              <DialogTrigger className="medium:hidden size-fit relative group rounded-full cursor-pointer flex-shrink-0">
                <Image
                  className="rounded-full border"
                  src={user?.image || "/Icons/noavatar.png"}
                  alt="avatar"
                  width={130}
                  height={130}
                />
                <div className="object-cover top-0 rounded-full absolute hidden group-hover:block size-full bg-black/10"></div>
                <div className="absolute top-[50px] hidden group-hover:block left-[45px]">
                  <Pencil size={40} />
                </div>
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-3">
                <form onSubmit={ImgForm.handleSubmit(UpdateUserImgSubmit)}>
                  <input type="hidden" name="userId" value={user.id} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <FormField
                    control={ImgForm.control}
                    name="img"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              const reader = new FileReader();
                              reader.addEventListener("load", () => {
                                const imageUrl =
                                  reader.result?.toString() || "";
                                setUserImage(imageUrl);
                                ImgForm.setValue("img", imageUrl);
                              });
                              reader.readAsDataURL(file);
                            }}
                            type="file"
                            className="w-full"
                            accept="image/*"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  {ImgForm.getValues("img") && (
                    <div>
                      <h1>Preview</h1>
                      <ReactCrop
                        onChange={(pixelCrop, percentageCrop) =>
                          setCrop(percentageCrop)
                        }
                        crop={crop}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                        onComplete={(crop) => setCompletedCrop(crop)}
                      >
                        <img
                          alt=""
                          ref={imageRef}
                          src={ImgForm.getValues("img")}
                          style={{ maxHeight: "70vh" }}
                          onLoad={(e) => {
                            if (ImgForm.formState.errors.img) {
                              ImgForm.clearErrors("img");
                            }
                            const {
                              width,
                              height,
                              naturalWidth,
                              naturalHeight,
                            } = e.currentTarget;
                            if (
                              naturalWidth < MIN_DIMENSION ||
                              naturalHeight < MIN_DIMENSION
                            ) {
                              ImgForm.setError("img", {
                                message: "Image must be at least 150px x 150px",
                              });
                              setUserImage("");
                              ImgForm.setValue("img", "");
                              return;
                            }
                            const cropWidthInPercent =
                              (MIN_DIMENSION / width) * 100;
                            const crop = makeAspectCrop(
                              {
                                unit: "px",
                                width: cropWidthInPercent,
                              },
                              ASPECT_RATIO,
                              width,
                              height
                            );
                            setCrop(crop);
                          }}
                        />
                      </ReactCrop>
                      <canvas ref={canvasRef} style={{ display: "none" }} />
                      <div className="flex justify-center mt-4">
                        <Button
                          type="submit"
                          variant={"default"}
                          onClick={() => {
                            const croppedImage = getCroppedImg(
                              imageRef.current as HTMLImageElement,
                              completedCrop
                            );
                            if (croppedImage) {
                              setUserImage(croppedImage);
                              ImgForm.setValue("img", croppedImage);
                            }
                            setOpenPCModal(false);
                            setOpenMobileModal(false);
                          }}
                        >
                          {t("SaveImg")}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </DialogContent>
            </Dialog>
          </Form>
        ) : (
          <div className="medium:hidden size-fit rounded-full flex-shrink-0 cursor-pointer">
            <Image
              className="rounded-full border"
              src={user?.image || "/Icons/noavatar.png"}
              alt="avatar"
              width={130}
              height={130}
            />
          </div>
        )}
      </div>
      <div className="flex gap-4">
        {currentUser?.id === user?.id ? (
          <Form {...ImgForm}>
            <Dialog open={openPCModal} onOpenChange={setOpenPCModal}>
              <DialogTrigger className="hidden medium:block relative size-fit group rounded-full cursor-pointer flex-shrink-0">
                <Image
                  className="rounded-full border"
                  src={user?.image || "/Icons/noavatar.png"}
                  alt="avatar"
                  width={130}
                  height={130}
                />
                <div className="object-cover top-0 rounded-full absolute hidden group-hover:block size-full bg-black/10"></div>
                <div className="absolute top-[50px] hidden group-hover:block left-[45px]">
                  <Pencil color="#fff" size={40} />
                </div>
              </DialogTrigger>
              <DialogContent className="flex flex-col gap-3">
                <form onSubmit={ImgForm.handleSubmit(UpdateUserImgSubmit)}>
                  <input type="hidden" name="userId" value={user.id} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <FormField
                    control={ImgForm.control}
                    name="img"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              const reader = new FileReader();
                              reader.addEventListener("load", () => {
                                const imageUrl =
                                  reader.result?.toString() || "";
                                setUserImage(imageUrl);
                                ImgForm.setValue("img", imageUrl);
                              });
                              reader.readAsDataURL(file);
                            }}
                            type="file"
                            className="w-full"
                            placeholder="Select img for user avatar"
                            accept="image/*"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  {ImgForm.getValues("img") && (
                    <div>
                      <h1>Preview</h1>
                      <ReactCrop
                        onChange={(pixelCrop, percentageCrop) =>
                          setCrop(percentageCrop)
                        }
                        crop={crop}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                        onComplete={(crop) => setCompletedCrop(crop)}
                      >
                        <img
                          alt=""
                          ref={imageRef}
                          src={ImgForm.getValues("img")}
                          style={{ maxHeight: "70vh" }}
                          onLoad={(e) => {
                            if (ImgForm.formState.errors.img) {
                              ImgForm.clearErrors("img");
                            }
                            const {
                              width,
                              height,
                              naturalWidth,
                              naturalHeight,
                            } = e.currentTarget;
                            if (
                              naturalWidth < MIN_DIMENSION ||
                              naturalHeight < MIN_DIMENSION
                            ) {
                              ImgForm.setError("img", {
                                message: "Image must be at least 150px x 150px",
                              });
                              setUserImage("");
                              ImgForm.setValue("img", "");
                              return;
                            }
                            const cropWidthInPercent =
                              (MIN_DIMENSION / width) * 100;
                            const crop = makeAspectCrop(
                              {
                                unit: "%",
                                width: cropWidthInPercent,
                              },
                              ASPECT_RATIO,
                              width,
                              height
                            );
                            setCrop(crop);
                          }}
                        />
                      </ReactCrop>
                      <canvas ref={canvasRef} style={{ display: "none" }} />
                      <div className="flex justify-center mt-4">
                        <Button
                          type="submit"
                          variant={"default"}
                          onClick={() => {
                            const croppedImage = getCroppedImg(
                              imageRef.current as HTMLImageElement,
                              completedCrop
                            );
                            if (croppedImage) {
                              setUserImage(croppedImage);
                              ImgForm.setValue("img", croppedImage);
                            }
                            setOpenPCModal(false);
                            setOpenMobileModal(false);
                          }}
                        >
                          {t("Update")}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </DialogContent>
            </Dialog>
          </Form>
        ) : (
          <div className="hidden medium:block size-fit rounded-full cursor-pointer flex-shrink-0">
            <Image
              className="rounded-full border"
              src={user?.image || "/Icons/noavatar.png"}
              alt="avatar"
              width={130}
              height={130}
            />
          </div>
        )}
        <div className="w-full flex flex-col justify-between gap-2">
          <div className="flex items-center gap-2">
            {currentUser?.id === user?.id ? (
              <Form {...UserNameForm}>
                <Dialog
                  open={openUserNameModal}
                  onOpenChange={setOpenUserNameModal}
                >
                  <DialogTrigger className="flex hover:underline items-center gap-2">
                    <h1 className="font-bold text-xl">{user?.name}</h1>{" "}
                    <Pencil size={20} />
                  </DialogTrigger>
                  <DialogContent>
                    <form
                      onSubmit={UserNameForm.handleSubmit(UpdateUserNameSubmit)}
                      className="flex flex-col gap-3"
                    >
                      <input type="hidden" name="userId" value={user.id} />
                      <input type="hidden" name="pathName" value={pathName} />
                      <DialogHeader className="font-bold text-xl">
                        {t("UsernameChange")}
                      </DialogHeader>
                      <DialogDescription className="flex gap-1">
                        <Info color="orange" size={20} />{" "}
                        {t("UsernameChangeTime")}
                      </DialogDescription>
                      <FormField
                        control={UserNameForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder={t("NewUsername")}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" variant={"default"}>
                        {t("Update")}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </Form>
            ) : (
              <h1 className="font-bold text-xl">{user?.name}</h1>
            )}
            {user.isPlusPack === true && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="border size-fit rounded-lg p-2 border-yellow-500">
                    <Trophy className="text-yellow-400" size={20} />
                  </TooltipTrigger>
                  <TooltipContent>{t("PlusMember")}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="w-full">
            {currentUser?.id === user?.id ? (
              <Form {...UserBioForm}>
                <form onSubmit={UserBioForm.handleSubmit(UserDescriptionSubmit)} className="w-full">
                  <input type="hidden" name="userId" value={user.id} />
                  <input type="hidden" name="pathName" value={pathName} />
                  <FormField
                    control={UserBioForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TextareaAutosize
                            className="border rounded-lg p-2 w-full"
                            {...field}
                            minRows={3}
                            onFocus={() => setEditingDescription(true)}
                            value={descriptionValue}
                            onChange={(e) => {
                              setDescriptionValue(e.target.value);
                              field.onChange(e.target.value);
                              UserBioForm.setValue(
                                "description",
                                e.target.value
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {editingDescription && (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className={`ml-2 cursor-pointer text-green-500 dark:hover:bg-slate-700 hover:bg-slate-200 rounded-full p-1`}
                        type="submit"
                      >
                        <Check size={19} />
                      </button>
                      <div
                        onClick={() => {
                          setEditingDescription(!editingDescription);
                          setDescriptionValue(user.description);
                        }}
                        className="cursor-pointer bg-red-200 dark:hover:bg-slate-700 hover:bg-slate-200 rounded-full p-1"
                      >
                        <X className="text-red-500" size={19} />
                      </div>
                    </div>
                  )}
                </form>
              </Form>
            ) : (
              <TextareaAutosize
                readOnly
                name="bio"
                minRows={3}
                defaultValue={user.description}
                className="w-full border rounded-lg p-2 text-sm"
              />
            )}
          </div>
          <div className="grid grid-cols-2 md:flex sm:grid sm:grid-cols-2 gap-2">
            <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
              {t("Combos")} {user?.Combo.length}
            </span>
            <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
              {t2("Comments")}: {user?.comments.length}
            </span>
            <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
              {t("TotalLikes")}{" "}
              {combo.reduce(
                (a: any, b: { likes: string | any[] }) => a + b.likes.length,
                0
              )}
            </span>
            <span className="p-2 hover:bg-black/10 dark:hover:bg-black/50 border rounded-lg ">
              {t("TotalFavorites")}{" "}
              {combo.reduce(
                (a: any, b: { favorites: string | any[] }) =>
                  a + b.favorites.length,
                0
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
