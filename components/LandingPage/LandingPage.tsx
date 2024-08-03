import Image from "next/image";
import LandingHeader from "./LandingHeader";
import CombosShowcase from "./CombosShowcase";
import LandingPageContent from "./LandingPageContent";
import PricingSection from "./PricingSection";
import { Separator } from "../ui/separator";
import PricingHeader from "./PricingHeader";
import { useLocale, useTranslations } from "next-intl";

type currentUser = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
} | undefined

type Props = {
  currentUser: currentUser;
}

export default function LandingPage({ currentUser }: Props) {
  const t = useTranslations("LandingPage")
  const locale = useLocale();
  const PricingPacks = [
    {
      packname: `${t("StarterPack")}`,
      description: `${t("TryOutNewFeatures")}`,
      link:
        process.env.NODE_ENV === "development" 
          ? locale === "it" ? "https://buy.stripe.com/test_dR66pJahb8B57WUbJf" : "" ||
            locale === "en" ? "https://buy.stripe.com/test_6oEbK30GBg3x6SQ28B" : "" ||
            locale === "fr" ? "https://buy.stripe.com/test_00g9BVblf3gL4KI28q" : "" ||
            locale === "de" ? "https://buy.stripe.com/test_5kAg0j60VaJddhe14j" : "" ||
            locale === "ko" ? "https://buy.stripe.com/test_00g9BV3SNdVp90Y6oA" : "" ||
            locale === "jp" ? "https://buy.stripe.com/test_6oEaFZfBv3gL4KI5kt" : "" ||
            locale === "cn" ? "https://buy.stripe.com/test_28o15p0GB8B5cdaaEK" : "" ||
            locale === "pt" ? "https://buy.stripe.com/test_fZe01l4WRg3x6SQfZo" : ""
          : 
            locale === "it" ? "https://buy.stripe.com/test_dR66pJahb8B57WUbJf" : "" ||
            locale === "en" ? "https://buy.stripe.com/test_6oEbK30GBg3x6SQ28B" : "" ||
            locale === "fr" ? "https://buy.stripe.com/test_00g9BVblf3gL4KI28q" : "" ||
            locale === "de" ? "https://buy.stripe.com/test_5kAg0j60VaJddhe14j" : "" ||
            locale === "ko" ? "https://buy.stripe.com/test_00g9BV3SNdVp90Y6oA" : "" ||
            locale === "jp" ? "https://buy.stripe.com/test_6oEaFZfBv3gL4KI5kt" : "" ||
            locale === "cn" ? "https://buy.stripe.com/test_28o15p0GB8B5cdaaEK" : "" ||
            locale === "pt" ? "https://buy.stripe.com/test_fZe01l4WRg3x6SQfZo" : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? locale === "it" ? "price_1PiM7SBvVijJQ1Wro883Ek7B" : "" ||
            locale === "en" ? "price_1PZcT4BvVijJQ1WrylJ6DThC" : "" ||
            locale === "fr" ? "price_1PiM37BvVijJQ1WrD94xTLSB" : "" ||
            locale === "de" ? "price_1PiLtcBvVijJQ1Wr8B3n8wBo" : "" ||
            locale === "ko" ? "price_1PiLdxBvVijJQ1Wromqo7mX8" : "" ||
            locale === "jp" ? "price_1PiLSCBvVijJQ1Wr1k4CY4on" : "" ||
            locale === "cn" ? "price_1PiLBzBvVijJQ1WrVuTPkcT1" : "" ||
            locale === "pt" ? "price_1PiKdtBvVijJQ1WrIxWto4Dq" : ""
          : 
            locale === "it" ? "price_1PiM7SBvVijJQ1Wro883Ek7B" : "" ||
            locale === "en" ? "price_1PZcT4BvVijJQ1WrylJ6DThC" : "" ||
            locale === "fr" ? "price_1PiM37BvVijJQ1WrD94xTLSB" : "" ||
            locale === "de" ? "price_1PiLtcBvVijJQ1Wr8B3n8wBo" : "" ||
            locale === "ko" ? "price_1PiLdxBvVijJQ1Wromqo7mX8" : "" ||
            locale === "jp" ? "price_1PiLSCBvVijJQ1Wr1k4CY4on" : "" ||
            locale === "cn" ? "price_1PiLBzBvVijJQ1WrVuTPkcT1" : "" ||
            locale === "pt" ? "price_1PiKdtBvVijJQ1WrIxWto4Dq" : "",
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
      relevant: true,
      link:
        process.env.NODE_ENV === "development" 
          ? locale === "it" ? "https://buy.stripe.com/test_28o4hB1KFcRl4KI8x4" : "" ||
            locale === "en" ? "https://buy.stripe.com/test_4gwbK39d75oT5OM148" : "" ||
            locale === "fr" ? "https://buy.stripe.com/test_14k29t74Z6sX0useVu" : "" ||
            locale === "de" ? "https://buy.stripe.com/test_5kAcO70GB2cHdhe4gw" : "" ||
            locale === "ko" ? "https://buy.stripe.com/test_6oEcO72OJ3gLfpm7sF" : "" ||
            locale === "jp" ? "https://buy.stripe.com/test_28o6pJblf3gL7WUaFo" : "" ||
            locale === "cn" ? "https://buy.stripe.com/test_cN2cO774Z2cH2CAdQX" : "" ||
            locale === "pt" ? "https://buy.stripe.com/test_fZe3dx60V2cH5OMaF9" : ""
          : 
            locale === "it" ? "https://buy.stripe.com/test_28o4hB1KFcRl4KI8x4" : "" ||
            locale === "en" ? "https://buy.stripe.com/test_4gwbK39d75oT5OM148" : "" ||
            locale === "fr" ? "https://buy.stripe.com/test_14k29t74Z6sX0useVu" : "" ||
            locale === "de" ? "https://buy.stripe.com/test_5kAcO70GB2cHdhe4gw" : "" ||
            locale === "ko" ? "https://buy.stripe.com/test_6oEcO72OJ3gLfpm7sF" : "" ||
            locale === "jp" ? "https://buy.stripe.com/test_28o6pJblf3gL7WUaFo" : "" ||
            locale === "cn" ? "https://buy.stripe.com/test_cN2cO774Z2cH2CAdQX" : "" ||
            locale === "pt" ? "https://buy.stripe.com/test_fZe3dx60V2cH5OMaF9" : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? locale === "it" ? "price_1PiM8nBvVijJQ1WrOun6inDp" : "" ||
            locale === "en" ? "price_1PaNzMBvVijJQ1Wr6dLNC1Dm" : "" ||
            locale === "fr" ? "price_1PiM4OBvVijJQ1WrHNPbrNit" : "" ||
            locale === "de" ? "price_1PiLvSBvVijJQ1WrmMpD2Jcn" : "" ||
            locale === "ko" ? "price_1PiLivBvVijJQ1WrUKQb3yi8" : "" ||
            locale === "jp" ? "price_1PiLVlBvVijJQ1WrOe6JXatz" : "" ||
            locale === "cn" ? "price_1PiLGTBvVijJQ1WrtIEqTBNd" : "" ||
            locale === "pt" ? "price_1PiKflBvVijJQ1WrnNrruWRk" : ""
          : 
            locale === "it" ? "price_1PiM8nBvVijJQ1WrOun6inDp" : "" ||
            locale === "en" ? "price_1PaNzMBvVijJQ1Wr6dLNC1Dm" : "" ||
            locale === "fr" ? "price_1PiM4OBvVijJQ1WrHNPbrNit" : "" ||
            locale === "de" ? "price_1PiLvSBvVijJQ1WrmMpD2Jcn" : "" ||
            locale === "ko" ? "price_1PiLivBvVijJQ1WrUKQb3yi8" : "" ||
            locale === "jp" ? "price_1PiLVlBvVijJQ1WrOe6JXatz" : "" ||
            locale === "cn" ? "price_1PiLGTBvVijJQ1WrtIEqTBNd" : "" ||
            locale === "pt" ? "price_1PiKflBvVijJQ1WrnNrruWRk" : "",
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
          ? locale === "it" ? "https://buy.stripe.com/test_9AQ8xR89304z6SQcNG" : "" ||
            locale === "en" ? "https://buy.stripe.com/test_4gwg0jfBv04zdhe6pd" : "" ||
            locale === "fr" ? "https://buy.stripe.com/test_4gwcO70GB3gL0us28K" : "" ||
            locale === "de" ? "https://buy.stripe.com/test_8wM29tblf9F96SQcNF" : "" ||
            locale === "ko" ? "https://buy.stripe.com/test_cN2cO7exrg3xcda3cU" : "" ||
            locale === "jp" ? "https://buy.stripe.com/test_8wMg0j9d7eZt90Y00b" : "" ||
            locale === "cn" ? "https://buy.stripe.com/test_28o5lF9d76sX5OMfZM" : "" ||
            locale === "pt" ? "https://buy.stripe.com/test_eVa6pJdtn9F9a523cA" : ""
          : 
            locale === "it" ? "https://buy.stripe.com/test_9AQ8xR89304z6SQcNG" : "" ||
            locale === "en" ? "https://buy.stripe.com/test_4gwg0jfBv04zdhe6pd" : "" ||
            locale === "fr" ? "https://buy.stripe.com/test_4gwcO70GB3gL0us28K" : "" ||
            locale === "de" ? "https://buy.stripe.com/test_8wM29tblf9F96SQcNF" : "" ||
            locale === "ko" ? "https://buy.stripe.com/test_cN2cO7exrg3xcda3cU" : "" ||
            locale === "jp" ? "https://buy.stripe.com/test_8wMg0j9d7eZt90Y00b" : "" ||
            locale === "cn" ? "https://buy.stripe.com/test_28o5lF9d76sX5OMfZM" : "" ||
            locale === "pt" ? "https://buy.stripe.com/test_eVa6pJdtn9F9a523cA" : "",
      priceId:
        process.env.NODE_ENV === "development"
          ? locale === "it" ? "price_1PiMAhBvVijJQ1Wrf4kvFI9w" : "" ||
            locale === "en" ? "price_1PaOJnBvVijJQ1WrXqLRbQBK" : "" ||
            locale === "fr" ? "price_1PiM6VBvVijJQ1WrOFk4COFx" : "" ||
            locale === "de" ? "price_1PiLzfBvVijJQ1WrR3wrcvxn" : "" ||
            locale === "ko" ? "price_1PiLnDBvVijJQ1WrmhXBykEn" : "" ||
            locale === "jp" ? "price_1PiLYwBvVijJQ1WrGynnsBGU" : "" ||
            locale === "cn" ? "price_1PiLKdBvVijJQ1WrqcaGe8zj" : "" ||
            locale === "pt" ? "price_1PiKx2BvVijJQ1Wr8nSuQPVr" : ""
          : 
            locale === "it" ? "price_1PiMAhBvVijJQ1Wrf4kvFI9w" : "" ||
            locale === "en" ? "price_1PaOJnBvVijJQ1WrXqLRbQBK" : "" ||
            locale === "fr" ? "price_1PiM6VBvVijJQ1WrOFk4COFx" : "" ||
            locale === "de" ? "price_1PiLzfBvVijJQ1WrR3wrcvxn" : "" ||
            locale === "ko" ? "price_1PiLnDBvVijJQ1WrmhXBykEn" : "" ||
            locale === "jp" ? "price_1PiLYwBvVijJQ1WrGynnsBGU" : "" ||
            locale === "cn" ? "price_1PiLKdBvVijJQ1WrqcaGe8zj" : "" ||
            locale === "pt" ? "price_1PiKx2BvVijJQ1Wr8nSuQPVr" : "",
      price: `${t("9_50")}`,
      features: [
        `${t("UnlimitedCombos")}`,
        `${t("3DaysOfHighlightDuration")}`,
        `${t("Plus15PerWeek")}`,
        `${t("MonthlyPayment")}`,
        `${t("PlusMemberTag")}`,
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
                currentUser={currentUser}
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
                relevant={pack.relevant}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
