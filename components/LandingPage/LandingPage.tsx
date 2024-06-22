import Image from "next/image";
import LandingHeader from "./LandingHeader";
import CombosShowcase from "./CombosShowcase";
import LandingPageContent from "./LandingPageContent";

export default function LandingPage() {
  return (
    <main className="">
      <LandingHeader />
      <section className="mt-8">
        <h2 className="font-bold text-2xl mb-4">
          Take a look at the community combos
        </h2>
        <CombosShowcase />
      </section>
      <section className="mt-14">
        <LandingPageContent />
      </section>
    </main>
  );
}
