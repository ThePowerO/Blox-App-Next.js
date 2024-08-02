'use client';

import {
  Award,
  Globe,
  MessageCircleMore,
  PartyPopper,
  Search,
  Swords,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import TextGradient from "../HtmlComponents/TextGradient";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLocale, useTranslations } from "next-intl";

export default function LandingPageContent() {
  const t = useTranslations("LandingPage");
  const locale = useLocale();
  const ImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('.imagem', {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".content-1",
        start: "top 400px",
        end: "bottom 500px",
      }
    })
    gsap.to('.imagem-2', {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".content-2",
        start: "top 400px",
        end: "bottom 500px",
      }
    })

    return () => {
      gsap.killTweensOf('.imagem');
      gsap.killTweensOf('.imagem-2');
    }
  }, []);
  return (
    <>
      <div className="content-1 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-24">
        <div ref={ImageRef} className="p-3">
          {locale === "en" && (
            <>
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg hidden dark:block light:hidden`}
                src="/Create-Combo-GUIDE-Dark.png"
                width={700}
                height={700}
                alt="combo guide"
              />
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg dark:hidden`}
                src="/Create-Combo-GUIDE.png"
                width={700}
                height={700}
                alt="combo guide"
              />
            </>
          )}
          {locale === "kr" && (
            <>
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg hidden dark:block light:hidden`}
                src="/Create-Combo-GUIDE-KR-Dark.png"
                width={700}
                height={700}
                alt="combo guide"
              />
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg dark:hidden`}
                src="/Create-Combo-GUIDE-KR.png"
                width={700}
                height={700}
                alt="combo guide"
              />
            </>
          )}
          {locale === "jp" && (
            <>
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg hidden dark:block light:hidden`}
                src="/Create-Combo-GUIDE-JP-Dark.png"
                width={700}
                height={700}
                alt="combo guide"
              />
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg dark:hidden`}
                src="/Create-Combo-GUIDE-JP.png"
                width={700}
                height={700}
                alt="combo guide"
              />
            </>
          )}
          {locale === "cn" && (
            <>
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg hidden dark:block light:hidden`}
                src="/Create-Combo-GUIDE-CN-Dark.png"
                width={700}
                height={700}
                alt="combo guide"
              />
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg dark:hidden`}
                src="/Create-Combo-GUIDE-IMG.png"
                width={700}
                height={700}
                alt="combo guide"
              />
            </>
          )}
          {locale === "fr" && (
            <>
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg hidden dark:block light:hidden`}
                src="/Create-Combo-GUIDE-FR-Dark.png"
                width={700}
                height={700}
                alt="combo guide"
              />
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg dark:hidden`}
                src="/Create-Combo-GUIDE-FR-IMG.png"
                width={700}
                height={700}
                alt="combo guide"
              />
            </>
          )}
          {locale === "it" && (
            <>
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg hidden dark:block light:hidden`}
                src="/Create-Combo-GUIDE-IT-Dark.png"
                width={700}
                height={700}
                alt="combo guide"
              />
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg dark:hidden`}
                src="/Create-Combo-GUIDE-IT.png"
                width={700}
                height={700}
                alt="combo guide"
              />
            </>
          )}
          {locale === "pt" && (
            <>
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg hidden dark:block light:hidden`}
                src="/Create-Combo-GUIDE-PT-Dark.png"
                width={700}
                height={700}
                alt="combo guide"
              />
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg dark:hidden`}
                src="/Create-Combo-GUIDE-PT.png"
                width={700}
                height={700}
                alt="combo guide"
              />
            </>
          )}
          {locale === "de" && (
            <>
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg hidden dark:block light:hidden`}
                src="/Create-Combo-GUIDE-DE-Dark.png"
                width={700}
                height={700}
                alt="combo guide"
              />
              <Image
                className={`imagem opacity-0 translate-x-[-400px] rounded-lg dark:hidden`}
                src="/Create-Combo-GUIDE-DE.png"
                width={700}
                height={700}
                alt="combo guide"
              />
            </>
          )}

        </div>
        <div className="mx-auto max-w-lg text-center">
          <strong className={`${locale !== "en" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
            {t("BuildAExquisiteFascinating")} <TextGradient from="from-blue-700" via="via-pink-700" to="to-pink-500" text={`${t("Combo")}`} />
          </strong>
          <strong className={`${locale !== "pt" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
            {t("FaçaUm")} <TextGradient from="from-blue-700" via="via-pink-700" to="to-pink-500" text={`${t("Combo")}`} /> {t("ÚnicoEfascinante")}
          </strong>
          <strong className={`${locale !== "fr" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
            {t("BuildAExquisiteFascinating")} <TextGradient from="from-blue-700" via="via-pink-700" to="to-pink-500" text={`${t("Combo")}`} />
          </strong>
          <strong className={`${locale !== "it" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
            {t("CreareUn")} <TextGradient from="from-blue-700" via="via-pink-700" to="to-pink-500" text={`${t("Combo")}`} /> {t("ExquisiteFascinating")}
          </strong>
          <strong className={`${locale !== "de" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
            {t("BuildAExquisiteFascinating")} <TextGradient from="from-blue-700" via="via-pink-700" to="to-pink-500" text={`${t("Combo")}`} />
          </strong>
          <strong className={`${locale !== "cn" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
            {t("BuildAExquisiteFascinating")}<TextGradient from="from-blue-700" via="via-pink-700" to="to-pink-500" text={`${t("Combo")}`}/>
          </strong>
          <strong className={`${locale !== "jp" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
            {t("BuildAExquisiteFascinating")}<TextGradient from="from-blue-700" via="via-pink-700" to="to-pink-500" text={`${t("Combo")}`} />{t("Build")}
          </strong>
          <strong className={`${locale !== "kr" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
            {t("독특하고흥미로운")} <TextGradient from="from-blue-700" via="via-pink-700" to="to-pink-500" text={`${t("콤보")}`} />{t("만들어보세요")}
          </strong>
          <p className="mt-4 text-gray-300">
            {t("CreateAComboGoEnjoy")}
            {t("ExcitingFeatures")}
          </p>
        </div>
      </div>

      <div className="content-2 overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-24">
        <div className="mx-auto max-w-lg text-center">
          <strong className="text-3xl font-bold sm:text-4xl">
            {t("EncounterNewWaysToPlay")}
          </strong>
          <p className="mt-4 text-gray-300">
            {t("PickAComboOrCreate")}
            {t("AndMasterHowToWin")}
          </p>
        </div>
        <div className="p-3">
          <Image
            className="imagem-2 opacity-0 translate-x-[500px] rounded-lg"
            src="/BF-BG.png"
            width={600}
            height={600}
            alt="combo guide"
          />
        </div>
      </div>

      <div className="mx-auto max-w-lg text-center">
        <h3 className={`${locale === "jp" || locale === "cn" || locale === "kr" ? "hidden" : "block"} text-3xl font-bold sm:text-4xl`}>
          {t("StartYourJourney")} <span className="curved-underline">{t("Here")}</span>
        </h3>
        <h3 className={`${locale !== "kr" ? "hidden" : "block"} text-3xl font-bold sm:text-4xl`}>
          <span className="curved-underline">{t("여기에서")}</span>{t("여행을 시작하세요")} 
        </h3>
        <h3 className={`${locale !== "cn" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
          <span className="curved-underline">{t("Here")}</span>{t("StartYourJourney")} 
        </h3>
        <h3 className={`${locale !== "jp" ? "hidden" : "block" } text-3xl font-bold sm:text-4xl`}>
          <span className="curved-underline">{t("Here")}</span>{t("StartYourJourney")} 
        </h3>

        <p className="mt-4 text-gray-300">
          {t("BeginYourJourney")}
          {t("AndEnjoyAllFeatures")}
        </p>
      </div>
      <div className="grid p-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300 ">
          <div className="flex flex-col gap-2 p-5">
            <Globe className="size-12" />
            <span className="font-bold ">{t("JoinCommunity")}</span>
            <p>
              {t("BePartOfCommunity")}
              {t("WhoseFitsPersonallity")}
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <PartyPopper className="size-12" />
            <span className="font-bold ">{t("MakeTeams")}</span>
            <p>
              {t("FindYourTeam")}
              {t("StartHunting")}
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <Search className="size-12" />
            <span className="font-bold ">{t("Combos")}</span>
            <p>
              {t("LookOthersCombosInspire")}
              {t("TryOutNewPVPStyle")}
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <Swords className="size-12" />
            <span className="font-bold ">{t("PVP")}</span>
            <p>
              {t("ChallengeToFightPeople")}
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <Award className="size-12" />
            <span className="font-bold ">{t("Highlight")}</span>
            <p>
              {t("FindOrHighlightCombos")}
            </p>
          </div>
        </div>
        <div className="border rounded-lg cursor-pointer hover:shadow-xl hover:border-cyan-800 hover:shadow-cyan-800 transition-all dureation-300">
          <div className="flex flex-col gap-2 p-5">
            <MessageCircleMore className="size-12" />
            <span className="font-bold ">{t("Comments")}</span>
            <p>
              {t("DiscussAndShareThoughts")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
