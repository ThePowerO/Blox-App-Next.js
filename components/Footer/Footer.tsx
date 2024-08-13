import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SiRoblox } from "react-icons/si";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="p-5 sm:p-12 justify-center flex-col sm:flex-row flex sm:items-center gap-5 mt-[50px] bg-[#212529] text-white">
      <div>
        <Link className="size-fit" href={"/"}>
          <Image
            src="/Site-logo.png"
            alt="Combosfy"
            width={100}
            height={100}
          />
        </Link>
        <span>Copyright © 2024 - Combosfy.com</span>
      </div>
      <div>
        <span className="font-bold text-gray-400">{t("Disclaimer")}</span>
        <p>
          {t("DisclaimerText")}<br />
          {t("NotAssiciatedWith")}<br />
          {t("NotOfficiallyAffiliatedWith")}<br />
        </p>
      </div>
      <div>
        <span className="font-bold text-gray-400">{t("Extra")}</span>
        <ul>
          <li>
            <Link className="hover:text-gray-400" href={"/"}>{t("TermsOfService")}</Link>
          </li>
          <li>
            <Link className="hover:text-gray-400" href={"/"}>{t("PrivacyPolicy")}</Link>
          </li>
        </ul>
      </div>
      <ul className="flex items-center gap-3">
        <li>
          <Link
            className="size-fit"
            target="_blank"
            href={"https://www.roblox.com/games/2753915549/Blox-Fruits"}
          >
            <SiRoblox className="size-8" />
          </Link>
        </li>
        <li>
          <Link
            className=""
            target="_blank"
            href={"https://github.com/ThePowerO/Blox-App-Next.js"}
          >
            <GitHubLogoIcon className="size-8 text-black" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
