"use client";

import React from "react";
import AddLikeButton, {
  AddFavoriteButton,
} from "../HtmlComponents/SubmitButtons";
import { Heart, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { IoLogoDiscord } from "react-icons/io5";
import { signIn } from "next-auth/react";

export default function NoSessionLikeFav() {
  const t = useTranslations("SignInPage");
  const locale = useLocale();

  const LoginWithGoogle = () => {
    signIn("google", { callbackUrl: `/${locale}/` });
  };

  const LoginWithDIscord = () => {
    signIn("discord", { callbackUrl: `/${locale}/` });
  };
  return (
    <div className="flex items-center gap-[5px]">
      <Dialog>
        <DialogTrigger className="flex gap-[5px] items-center">
          <>
            <Star
              className={`cursor-pointer`}
              color="#e0ec3d"
              onMouseOver={(e) => (e.currentTarget.style.fill = "#e0ec3d")}
              onMouseOut={(e) => (e.currentTarget.style.fill = "")}
              width={22}
              height={22}
            />
            <Heart
              className={`cursor-pointer`}
              color="#d64343"
              fillRule="inherit"
              onMouseOver={(e) => (e.currentTarget.style.fill = "#E21C49")}
              onMouseOut={(e) => (e.currentTarget.style.fill = "")}
              width={22}
              height={22}
            />
          </>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>{t("h1")}</DialogHeader>
          <Button
            type="button"
            onClick={LoginWithGoogle}
            className="flex gap-[5px] text-black hover:text-black dark:bg-[#fff]
                border border-input dark:hover:bg-stone-200 transition-all"
            variant="outline"
          >
            <FcGoogle className="text-2xl" />
            {t("withgoogle")}
          </Button>
          <Button
            type="button"
            onClick={LoginWithDIscord}
            className="flex gap-[5px] text-white hover:bg-[#2c396e] transition-all
                border border-[#42599f] bg-[#42599f]"
          >
            <IoLogoDiscord className="text-2xl" />
            {t("withdiscord")}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
