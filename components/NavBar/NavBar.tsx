"use client";

import Link from "next/link";
import Links from "./navLinks/Links";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import ProfileSelector from "./ProfileSelector/ProfileSelector";
import { Menu } from "lucide-react";
import { ThemeModeToggle } from "./ThemeModeToggle";
import MobileNavBar from "./MobileNavBar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const NavBar = ({ locale }: { locale: string }) => {
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

  //fixed top-0 left-0 right-0 z-[10] w-full flex justify-center bg-[#212529] shadow-v2
  //w-[1000px] flex items-center justify-between text-white h-[60px]
  //flex items-center gap-[20px] justify-between
  return (
    <div
      className={`fixed top-0 w-full z-[999]  ${
        pathName === `/${locale}` ? `${
        isScrolled ? 'bg-black/20 backdrop-blur-sm shadow-md' : 'bg-transparent'
      } transition-all duration-300` : "bg-[#212529]"} `}
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
            <ProfileSelector locale={locale} />
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
          <div className="flex">
            <LanguageSelector item={links[0]} locale={locale} />
            <ThemeModeToggle />
            <ProfileSelector locale={locale} />
          </div>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
