"use client";

import React, { useEffect, useRef } from "react";

export default function PricingHeader() {
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
          Pricing Packages
        </strong>
        <p className="mt-4 text-gray-300">
          Get Highlights to make your combos more atractive.
        </p>
      </div>
    </>
  );
}
