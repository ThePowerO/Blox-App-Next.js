"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { IoLanguageSharp } from "react-icons/io5";
import USImg from "@/public/LanguageImages/US.png";
import FRImg from "@/public/LanguageImages/FR.png";
import ITImg from "@/public/LanguageImages/IT.png";
import BRImg from "@/public/LanguageImages/BR.png";
import CNImg from "@/public/LanguageImages/CN.png";
import KRImg from "@/public/LanguageImages/KR.png";
import JPImg from "@/public/LanguageImages/JP.png";
import DEImg from "@/public/LanguageImages/DE.png";
import { Link, usePathname, useRouter } from "@/navigation";

const LanguageSelector = ({
  item,
  locale,
}: {
  item: { title: string; path: string };
  locale: string;
}) => {
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>();
  const menuRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Recupera o idioma armazenado no localStorage ao carregar o componente
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      setSelectedLanguage(storedLanguage);
    }

    if (typeof window !== "undefined") {
      // Adiciona o event listener somente no lado do cliente
      window.addEventListener("click", handleWindowClick);
    }

    // Remove o event listener quando o componente é desmontado
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("click", handleWindowClick);
      }
    };
  }, []);

  const handleWindowClick = (e: MouseEvent) => {
    if (
      menuRef.current &&
      imgRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !imgRef.current.contains(e.target as Node)
    ) {
      setOpenMenu(false);
    }
  };

  const handleLanguageClick = (img: string) => {
    setOpenMenu(false);
    setSelectedLanguage(img);

    // Armazena o idioma selecionado no localStorage
    localStorage.setItem("selectedLanguage", img);
  };

  const Languages = [
    {
      title: "English",
      img: USImg,
      locale: "en",
    },
    {
      title: "Français",
      img: FRImg,
      locale: "fr",
    },
    {
      title: "Deutsch",
      img: DEImg,
      locale: "de",
    },
    {
      title: "Italiano",
      img: ITImg,
      locale: "it",
    },
    {
      title: "Português",
      img: BRImg,
      locale: "pt",
    },
    {
      title: "日本語",
      img: JPImg,
      locale: "jp",
    },
    {
      title: "한국어",
      img: KRImg,
      locale: "kr",
    },
    {
      title: "简体中文",
      img: CNImg,
      locale: "cn",
    },
  ];

  const pathName = usePathname();

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div ref={imgRef}>
          {selectedLanguage ? (
            <Image
              className="rounded-full border hover:bg-gray-500 p-[10px] cursor-pointer transition-all"
              onClick={() => setOpenMenu((prev) => !prev)}
              src={selectedLanguage}
              alt="Selected Language"
              width={40}
              height={40}
            />
          ) : (
            <IoLanguageSharp
              className={`rounded-full border dark:border-gray-700 hover:bg-gray-500 p-[10px] ${pathName === `/` ? "" : "text-white"} w-[40px] h-[40px] cursor-pointer`}
              onClick={() => setOpenMenu((prev) => !prev)}
            />
          )}
        </div>
        {openMenu && (
          <div
            ref={menuRef}
            className="bg-[#212529] text-white p-4 w-[170px] shadow-lg absolute -left-[57px] top-[50px] rounded-lg"
          >
            <ul>
              {Languages.map((idiom) => (
                <Link
                  scroll={false}
                  href={pathname}
                  locale={
                    idiom.locale as
                      | "en"
                      | "pt"
                      | "fr"
                      | "de"
                      | "it"
                      | "jp"
                      | "kr"
                      | "cn"
                      | undefined
                  }
                  onClick={() => handleLanguageClick(idiom.img.src)}
                  className="flex p-[10px] items-center cursor-pointer gap-[10px] hover:bg-gray-500 rounded-lg"
                  key={idiom.title}
                >
                  <Image
                    className="w-[20px] h-[20px]"
                    src={idiom.img}
                    alt={idiom.title}
                  />
                  <p>{idiom.title}</p>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
