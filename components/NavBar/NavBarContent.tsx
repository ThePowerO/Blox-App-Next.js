'use client';

import React, { useEffect, useState } from "react";
import Links from "./navLinks/Links";
import MobileNavBar from "./MobileNavBar";
import ProfileSelector from "./ProfileSelector/ProfileSelector";
import { ThemeModeToggle } from "./ThemeModeToggle";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function NavBarContent({ locale, userHighlights }: { locale: string, userHighlights: number }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Users",
      path: "/users",
    },
    {
      title: "Combos",
      path: "/combos",
    },
    {
      title: "Your Combos",
      path: "/your-combos",
    },
  ];

  const pathName = usePathname();
  return (
    <div
      className={`fixed top-0 w-full z-[999]  ${
        pathName === `/${locale}`
          ? `${
              isScrolled
                ? "bg-black/20 backdrop-blur-sm shadow-md"
                : "bg-transparent"
            } transition-all duration-300`
          : "bg-[#212529]"
      } `}
    >
      {pathName === `/${locale}` ? (
        <nav
          className={`md:max-w-[1000px] md:m-auto flex justify-between items-center p-2`}
        >
          <Link href={`/${locale}`} className="hidden md:block">
            <Image
              alt="Combofy Logo"
              src={"/Site-Logo.png"}
              width={60}
              height={60}
              className="cursor-pointer rounded-lg"
            />
          </Link>
          <MobileNavBar locale={locale} />
          <div className="hidden md:block">
            <Links locale={locale} />
          </div>
          <div className="flex gap-2">
            <LanguageSelector item={links[0]} locale={locale} />
            <ThemeModeToggle />
            <ProfileSelector userHighlights={userHighlights} locale={locale} />
          </div>
        </nav>
      ) : (
        <nav
          className={`md:max-w-[1000px] md:m-auto flex justify-between items-center p-2`}
        >
          <Link href={`/${locale}`} className="hidden text-white md:block">
            <Image
              alt="Combofy Logo"
              src={"/Site-Logo.png"}
              width={60}
              height={60}
              className="cursor-pointer rounded-lg"
            />
          </Link>
          <MobileNavBar locale={locale} />
          <div className="text-white hidden md:block">
            <Links locale={locale} />
          </div>
          <div className="flex gap-2">
            <LanguageSelector item={links[0]} locale={locale} />
            <ThemeModeToggle />
            <ProfileSelector userHighlights={userHighlights} locale={locale} />
          </div>
        </nav>
      )}
    </div>
  );
}
