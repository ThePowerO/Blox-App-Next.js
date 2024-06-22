"use client"

import { useState, useRef, useEffect, SetStateAction } from "react";
import { MoonIcon, SunIcon, LaptopIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname } from "next/navigation";
import { useLocale } from "@/LocaleContext";

export function ThemeModeToggle() {

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        // Adiciona o event listener somente no lado do cliente
        window.addEventListener("click", handleWindowClick);
    }

    // Remove o event listener quando o componente é desmontado
    return () => {
        if (typeof window !== 'undefined') {
            window.removeEventListener("click", handleWindowClick);
        }
    };
  }, []);

  const handleWindowClick = (e: MouseEvent) => {
    if (menuRef.current && imgRef.current && !menuRef.current.contains(e.target as Node) && !imgRef.current.contains(e.target as Node)) {
      setOpenMenu(false);
    }
  };

  const { locale } = useLocale();
  const { setTheme } = useTheme()
  const pathName = usePathname();

  return (
    <div className="relative">
      <div ref={imgRef}>
        <Button onClick={() => setOpenMenu((prev) => !prev)} className="border dark:border-gray-700 text-white rounded-full hover:bg-gray-500 bg-transparent" size="icon">
          <SunIcon className={`${pathName === `/${locale}` ? "text-black" : ""}
            h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0`} />
          <MoonIcon className={`
            absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100`} />
        </Button>
      </div>
      {openMenu && (
        <div ref={menuRef} className="text-white bg-[#212529] p-2 absolute left-[-35px] top-[50px] rounded-lg">
          <ul>
            <li>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-2 dark:hover:bg-gray-500 dark:text-white"
                onClick={() => {
                  setTheme("light");
                  setOpenMenu(false);
                }}
              >
                <SunIcon className="w-[1.2rem] h-[1.2rem]" />
                Light
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start gap-2 dark:hover:bg-gray-500 dark:text-white"
                onClick={() => {
                  setTheme("dark");
                  setOpenMenu(false);
                }}
              >
                <MoonIcon />
                Dark
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full flex items-center gap-2 dark:hover:bg-gray-500 dark:text-white"
                onClick={() => {
                  setTheme("system");
                  setOpenMenu(false);
                }}
              >
                <LaptopIcon />
                System
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
