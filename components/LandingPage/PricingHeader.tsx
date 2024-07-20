"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from "react";

export default function PricingHeader() {
  const t = useTranslations("LandingPage");
  const pricingPacksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === "#pricing-packs" && pricingPacksRef.current) {
      pricingPacksRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div ref={pricingPacksRef} id="pricing-packs" className="w-full border h-1 mb-20"></div>
      <div className="mx-auto max-w-lg text-center">
        <strong className="text-3xl font-bold sm:text-4xl">
          {t("PricingPackages")}
        </strong>
        <p className="mt-4 text-gray-300">
          {t("MakeCombosAtractive")}
        </p>
      </div>
    </>
  );
}
