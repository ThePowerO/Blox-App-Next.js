import Image from "next/image";
import LandingHeader from "./LandingHeader";
import CombosShowcase from "./CombosShowcase";
import LandingPageContent from "./LandingPageContent";
import PricingSection from "./PricingSection";
import { Separator } from "../ui/separator";
import PricingHeader from "./PricingHeader";
import { useTranslations } from "next-intl";

export default function LandingPage() {
  const t = useTranslations("LandingPage")
  const PricingPacks = [
    {
      packname: `${t("StarterPack")}`,
      description: `${t("TryOutNewFeatures")}`,
      link:
        process.env.NODE_ENV === "development" 
          ? 'https://buy.stripe.com/test_5kA5lF8938B52CA3cf'
          : '',
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PZcT4BvVijJQ1WrylJ6DThC"
          : '',
      price: `${t("1_99")}`,
      features: [
        `${t("1DayOfHilightDuration")}`,
        `${t("Plus3Highlights")}`,
        `${t("Plus2FirstTime")}`,
        `${t("OneTimePayment")}`,
        `${t("UnlimitedPurchases")}`,
      ],
      notIncluded: [
        `${t("UnlimitedCombos")}`,
        `${t("3DaysOfHighlightDuration")}`,
        `${t("Plus8Highlights")}`,
        `${t("Plus15PerWeek")}`,
        `${t("MonthlyPayment")}`,
      ]
    },
  
    {
      packname: `${t("ProPack")}`,
      description: `${t("EnjoyBrandNewFeatures")}`,
      link:
        process.env.NODE_ENV === "development" 
          ? 'https://buy.stripe.com/test_4gwbK39d75oT5OM148'
          : '',
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PaNzMBvVijJQ1Wr6dLNC1Dm"
          : '',
      price: `${t("4_99")}`,
      features: [
        `${t("UnlimitedCombos")}`,
        `${t("2DaysOfHighlightDuration")}`,
        `${t("Plus8Highlights")}`,
        `${t("Plus2FirstTime")}`,
        `${t("OneTimePayment")}`,
        `${t("UnlimitedPurchases")}`,
      ],
      notIncluded: [
        `${t("3DaysOfHighlightDuration")}`,
        `${t("Plus15PerWeek")}`,
        `${t("MonthlyPayment")}`,
      ]
    },
  
    {
      packname: `${t("PlusPack")}`,
      isSubscription: true,
      description: `${t("UnlockFullPotential")}`,
      hasInfo: true,
      link:
        process.env.NODE_ENV === "development" 
          ? 'https://buy.stripe.com/test_6oE3dxfBv04zeli9AF'
          : '',
      priceId:
        process.env.NODE_ENV === "development"
          ? "price_1PaOJnBvVijJQ1WrXqLRbQBK"
          : '',
      price: `${t("9_50")}`,
      features: [
        `${t("UnlimitedCombos")}`,
        `${t("3DaysOfHighlightDuration")}`,
        `${t("Plus15PerWeek")}`,
        `${t("MonthlyPayment")}`,
      ],
    },
  ]

  return (
    <main>
      <LandingHeader />
      <section className="mt-8">
        <h2 className="font-bold text-2xl mb-4">
          {t("TakeALookAtCombos")}
        </h2>
        <CombosShowcase />
      </section>
      <section className="mt-14">
        <LandingPageContent />
      </section>
      <section>
        <PricingHeader />
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
                link={pack.link}
                priceId={pack.priceId}
                isSubscription={pack.isSubscription}
                hasInfo={pack.hasInfo}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
