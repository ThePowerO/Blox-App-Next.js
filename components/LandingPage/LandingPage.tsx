import Image from "next/image";
import React, { Suspense } from "react";
import LandingHeader from "./LandingHeader";
import CombosShowcase from "./CombosShowcase";

export default function LandingPage() {
  return (
    <section className="relative bg-center bg-no-repeat overflow-y-hidden">
      <LandingHeader />
      <section className="mt-8">
        <h2 className="font-bold text-2xl mb-4">Take a look at the community combos</h2>
        <CombosShowcase />
      </section>
    </section>
  );
}