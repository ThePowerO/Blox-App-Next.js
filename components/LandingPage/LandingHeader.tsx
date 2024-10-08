'use client';

import Image from "next/image";
import Mammoth from "../../public/MammothFruit.webp";
import Leopard from "../../public/LeopardFruit.webp";
import Bomb from "../../public/BombFruit.webp";
import Ope from "../../public/ControlFruit.webp";
import gsap from 'gsap';
import React, { useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LandingHeader() {
  const locale = useLocale();
  const learnMoreRef = useRef<HTMLDivElement>(null);
  const mammothRef = useRef(null);
  const leopardRef = useRef(null);
  const bombRef = useRef(null);
  const opeRef = useRef(null);
  const mobileOpeRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(mammothRef.current, {
      duration: 4,
      rotation: 20,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
    tl.to(leopardRef.current, {
      duration: 4,
      rotation: -30,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
    tl.to(bombRef.current, {
      duration: 4,
      rotation: -13,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
    tl.to(opeRef.current, {
      duration: 4,
      rotation: -20,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
    tl.to(mobileOpeRef.current, {
      duration: 4,
      rotation: -20,
      ease: "power1.inOut",
      transformOrigin: "center center",
    }, 0);
  }, []);

  const t = useTranslations("LandingPage");

  useEffect(() => {
    if (window.location.hash === "#learn-more-section" && learnMoreRef.current) {
      learnMoreRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div className="relative px-4 py-16 medium:py-24 sm:px-6 lg:flex lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right relative">
          <h1 className="text-3xl font-extrabold sm:text-5xl relative">
            <span className="relative">
              {t("h1Build")}
              <Image
                ref={bombRef}
                src={Bomb}
                width={80}
                height={80}
                className="absolute top-[-60px] -left-[40px]"
                alt="Bomb"
              />
              <Image
                ref={mammothRef}
                src={Mammoth}
                width={80}
                height={80}
                className="hidden sm:block sm:absolute sm:top-[-90px] sm:left-[300px] lg:top-[-90px] lg:left-[500px]"
                alt="Bomb"
              />
              <Image
                ref={leopardRef}
                src={Leopard}
                width={80}
                height={80}
                className="hidden sm:block sm:absolute  sm:top-[170px] sm:left-[430px] md:left-[570px] lg:top-[100px] lg:left-[700px]"
                alt="Bomb"
              />
              <Image
                ref={opeRef}
                src={Ope}
                width={80}
                height={80}
                className="hidden sm:block sm:absolute sm:top-[260px] sm:left-[310px]"
                alt="Ope"
              />
            </span>
            {t("h1FavComboToday")}
            <strong className="landing-page-header block font-extrabold text-cyan-500">
              {t("h1BecameA")}
              <span className="relative">
                {t("h1Hunter")}
                <Image
                  ref={mobileOpeRef}
                  src={Ope}
                  width={40}
                  height={40}
                  className="hidden tiny:block tiny:absolute tiny:top-0 tiny:left-[112px] sm:hidden"
                  alt="Ope"
                />
              </span>
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            {t("BuildAndShareTo")}
            {t("InJustFewClicks")}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href={`/${locale}/create-combo`}
              className="block w-full rounded bg-cyan-500 px-12 py-3 text-sm font-medium text-white shadow duration-150 ease-in-out hover:bg-cyan-600 focus:outline-none focus:ring active:bg-cyan-500 sm:w-auto"
            >
              {t("GetStarted")}
            </Link>

            <a
              href="#learn-more-section"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-cyan-500 shadow hover:text-cyan-700 focus:outline-none focus:ring active:text-cyan-500 sm:w-auto"
            >
              {t("LearnMore")}
            </a>
          </div>
        </div>
      </div>
      <div ref={learnMoreRef} id="learn-more-section" className="flex justify-center">
        <Image alt="" src={"/SquigleArrowShort.png"} width={60} height={60} />
      </div>
    </>
  );
}
