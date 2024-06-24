import Image from "next/image";
import LandingHeader from "./LandingHeader";
import CombosShowcase from "./CombosShowcase";
import LandingPageContent from "./LandingPageContent";
import PricingSection from "./PricingSection";
import { Separator } from "../ui/separator";

export default function LandingPage() {

  const PricingPacks = [
    {
      packname: "Starter Pack",
      description: "For small scale projects",
      timestopay: "3/3",
      price: '1,99',
      features: [
        "Create up to 8 combos",
        "1 Day of highlight duration",
        "+3 Highlights",
        "One time payment",
      ],
      notIncluded: [
        'Unlimited combos',
        "Up to 3 Days of highlight duration",
        '+8 Highlights',
        "+2 Highlights first purchase",
        "+15 Highlights per week",
        "Monthly payment",
      ]
    },

    {
      packname: "Pro Pack",
      description: "For large scale projects",
      timestopay: "3/3",
      price: '4,99',
      features: [
        "Unlimited combos",
        "2 Day of highlight duration",
        "+8 Highlights",
        "+2 Highlights first purchase",
        "One time payment",
      ],
      notIncluded: [
        "Up to 3 Days of highlight duration",
        "+15 Highlights per week",
        "Monthly payment",
      ]
    },

    {
      packname: "Plus Pack",
      description: "For large scale projects",
      price: '10,99',
      features: [
        "Unlimited combos",
        "Up to 3 Days of highlight duration",
        "+15 Highlights per week",
        "Monthly payment",
        "All previous features",
      ],
    },
  ]


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
      <section>
        <div className="mx-auto max-w-lg text-center mt-5">
          <strong className="text-3xl font-bold sm:text-4xl">
            Pricing Packages
          </strong>
          <p className="mt-4 text-gray-300">
            Get Highlights to make your combos more atractive.
          </p>
        </div>
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-3 md:gap-8">
            {PricingPacks.map((pack) => (
              <PricingSection
                key={pack.packname}
                packname={pack.packname}
                description={pack.description}
                price={pack.price}
                features={pack.features}
                notIncluded={pack.notIncluded}
                timestopay={pack.timestopay}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
