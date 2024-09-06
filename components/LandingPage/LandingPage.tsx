import Image from "next/image";
import LandingHeader from "./LandingHeader";
import CombosShowcase from "./CombosShowcase";
import LandingPageContent from "./LandingPageContent";
import PricingSection from "./PricingSection";
import { Separator } from "../ui/separator";
import PricingHeader from "./PricingHeader";
import { useLocale, useTranslations } from "next-intl";

export default function LandingPage() {
  const t = useTranslations("LandingPage")
  const locale = useLocale();
  const PricingPacks = [
    {
      packname: `${t("StarterPack")}`,
      description: `${t("TryOutNewFeatures")}`,
      link:
        process.env.NODE_ENV === "development" 
          ? locale === "it" ? "https://buy.stripe.com/test_dR66pJahb8B57WUbJf" : "" || // Italiano
            locale === "en" ? "https://buy.stripe.com/test_6oEbK30GBg3x6SQ28B" : "" || // English
            locale === "fr" ? "https://buy.stripe.com/test_00g9BVblf3gL4KI28q" : "" || // Français
            locale === "de" ? "https://buy.stripe.com/test_5kAg0j60VaJddhe14j" : "" || // Deutsch
            locale === "kr" ? "https://buy.stripe.com/test_00g9BV3SNdVp90Y6oA" : "" || // 한국어
            locale === "jp" ? "https://buy.stripe.com/test_6oEaFZfBv3gL4KI5kt" : "" || // 日本語
            locale === "cn" ? "https://buy.stripe.com/test_aEU5lFblf6sXfpmcNH" : "" || // 中文
            locale === "pt" ? "https://buy.stripe.com/test_aEU15pcpj6sX6SQeVR" : ""    // Português
          : 
            locale === "it" ? "https://buy.stripe.com/test_dR66pJahb8B57WUbJf" : "" || // Italiano
            locale === "en" ? "https://buy.stripe.com/test_6oEbK30GBg3x6SQ28B" : "" || // English
            locale === "fr" ? "https://buy.stripe.com/test_00g9BVblf3gL4KI28q" : "" || // Français
            locale === "de" ? "https://buy.stripe.com/test_5kAg0j60VaJddhe14j" : "" || // Deutsch
            locale === "kr" ? "https://buy.stripe.com/test_00g9BV3SNdVp90Y6oA" : "" || // 한국어
            locale === "jp" ? "https://buy.stripe.com/test_6oEaFZfBv3gL4KI5kt" : "" || // 日本語
            locale === "cn" ? "https://buy.stripe.com/test_aEU5lFblf6sXfpmcNH" : "" || // 中文
            locale === "pt" ? "https://buy.stripe.com/test_aEU15pcpj6sX6SQeVR" : "",   // Português
      priceId:
        process.env.NODE_ENV === "development"
          ? locale === "it" ? "price_1PiM7SBvVijJQ1Wro883Ek7B" : "" || // Italiano
            locale === "en" ? "price_1PZcT4BvVijJQ1WrylJ6DThC" : "" || // English
            locale === "fr" ? "price_1PiM37BvVijJQ1WrD94xTLSB" : "" || // Francais
            locale === "de" ? "price_1PiLtcBvVijJQ1Wr8B3n8wBo" : "" || // Deutsch
            locale === "kr" ? "price_1PiLdxBvVijJQ1Wromqo7mX8" : "" || // 한국어
            locale === "jp" ? "price_1PiLSCBvVijJQ1Wr1k4CY4on" : "" || // 日本語
            locale === "cn" ? "price_1PiLBzBvVijJQ1WrVuTPkcT1" : "" || // 中文
            locale === "pt" ? "price_1PiKdtBvVijJQ1WrIxWto4Dq" : ""    // Português
          : 
            locale === "it" ? "price_1PiM7SBvVijJQ1Wro883Ek7B" : "" || // Italian
            locale === "en" ? "price_1PZcT4BvVijJQ1WrylJ6DThC" : "" || // English
            locale === "fr" ? "price_1PiM37BvVijJQ1WrD94xTLSB" : "" || // Francais
            locale === "de" ? "price_1PiLtcBvVijJQ1Wr8B3n8wBo" : "" || // Deutsch
            locale === "kr" ? "price_1PiLdxBvVijJQ1Wromqo7mX8" : "" || // 한국어
            locale === "jp" ? "price_1PiLSCBvVijJQ1Wr1k4CY4on" : "" || // 日本語
            locale === "cn" ? "price_1PiLBzBvVijJQ1WrVuTPkcT1" : "" || // 中文
            locale === "pt" ? "price_1PiKdtBvVijJQ1WrIxWto4Dq" : "",   // Português
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
          ? locale === "it" ? "https://buy.stripe.com/test_28o4hB1KFcRl4KI8x4" : "" || // Italiano
            locale === "en" ? "https://buy.stripe.com/test_4gwbK39d75oT5OM148" : "" || // English
            locale === "fr" ? "https://buy.stripe.com/test_14k29t74Z6sX0useVu" : "" || // Français
            locale === "de" ? "https://buy.stripe.com/test_5kAcO70GB2cHdhe4gw" : "" || // Deutsch
            locale === "kr" ? "https://buy.stripe.com/test_6oEcO72OJ3gLfpm7sF" : "" || // 한국어
            locale === "jp" ? "https://buy.stripe.com/test_28o6pJblf3gL7WUaFo" : "" || // 日本語
            locale === "cn" ? "https://buy.stripe.com/test_3cscO73SN04z5OM7to" : "" || // 中文
            locale === "pt" ? "https://buy.stripe.com/test_fZe3dx60V2cH5OMaF9" : ""    // Português
          : 
            locale === "it" ? "https://buy.stripe.com/test_28o4hB1KFcRl4KI8x4" : "" || // Italiano
            locale === "en" ? "https://buy.stripe.com/test_4gwbK39d75oT5OM148" : "" || // English
            locale === "fr" ? "https://buy.stripe.com/test_14k29t74Z6sX0useVu" : "" || // Français
            locale === "de" ? "https://buy.stripe.com/test_5kAcO70GB2cHdhe4gw" : "" || // Deutsch
            locale === "kr" ? "https://buy.stripe.com/test_6oEcO72OJ3gLfpm7sF" : "" || // 한국어
            locale === "jp" ? "https://buy.stripe.com/test_28o6pJblf3gL7WUaFo" : "" || // 日本語
            locale === "cn" ? "https://buy.stripe.com/test_3cscO73SN04z5OM7to" : "" || // 中文
            locale === "pt" ? "https://buy.stripe.com/test_fZe3dx60V2cH5OMaF9" : "",   // Português
      priceId:
        process.env.NODE_ENV === "development"
          ? locale === "it" ? "price_1PiM8nBvVijJQ1WrOun6inDp" : "" || // Italiano
            locale === "en" ? "price_1PaNzMBvVijJQ1Wr6dLNC1Dm" : "" || // English
            locale === "fr" ? "price_1PiM4OBvVijJQ1WrHNPbrNit" : "" || // Français
            locale === "de" ? "price_1PiLvSBvVijJQ1WrmMpD2Jcn" : "" || // Deutsch
            locale === "kr" ? "price_1PiLivBvVijJQ1WrUKQb3yi8" : "" || // 한국어
            locale === "jp" ? "price_1PiLVlBvVijJQ1WrOe6JXatz" : "" || // 日本語
            locale === "cn" ? "price_1PiLGTBvVijJQ1WrtIEqTBNd" : "" || // 中文
            locale === "pt" ? "price_1PiKflBvVijJQ1WrnNrruWRk" : ""    // Português
          : 
            locale === "it" ? "price_1PiM8nBvVijJQ1WrOun6inDp" : "" ||
            locale === "en" ? "price_1PaNzMBvVijJQ1Wr6dLNC1Dm" : "" ||
            locale === "fr" ? "price_1PiM4OBvVijJQ1WrHNPbrNit" : "" ||
            locale === "de" ? "price_1PiLvSBvVijJQ1WrmMpD2Jcn" : "" ||
            locale === "kr" ? "price_1PiLivBvVijJQ1WrUKQb3yi8" : "" || // 한국어
            locale === "jp" ? "price_1PiLVlBvVijJQ1WrOe6JXatz" : "" || // 日本語
            locale === "cn" ? "price_1PiLGTBvVijJQ1WrtIEqTBNd" : "" || // 中文
            locale === "pt" ? "price_1PiKflBvVijJQ1WrnNrruWRk" : "",   // Português
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
          ? locale === "it" ? "https://buy.stripe.com/test_9AQ8xR89304z6SQcNG" : "" || // Italiano
            locale === "en" ? "https://buy.stripe.com/test_4gwg0jfBv04zdhe6pd" : "" || // English
            locale === "fr" ? "https://buy.stripe.com/test_4gwcO70GB3gL0us28K" : "" || // Français
            locale === "de" ? "https://buy.stripe.com/test_8wM29tblf9F96SQcNF" : "" || // Deutsch
            locale === "kr" ? "https://buy.stripe.com/test_cN2cO7exrg3xcda3cU" : "" || // 한국어
            locale === "jp" ? "https://buy.stripe.com/test_fZe9BV4WR18D7WUdRR" : "" || // 日本語
            locale === "cn" ? "https://buy.stripe.com/test_28o5lF9d76sX5OMfZM" : "" || // 中文
            locale === "pt" ? "https://buy.stripe.com/test_28o01lcpj5oT0us6pm" : ""    // Português
          : 
            locale === "it" ? "https://buy.stripe.com/test_9AQ8xR89304z6SQcNG" : "" || // Italiano
            locale === "en" ? "https://buy.stripe.com/test_4gwg0jfBv04zdhe6pd" : "" || // English
            locale === "fr" ? "https://buy.stripe.com/test_4gwcO70GB3gL0us28K" : "" || // Français
            locale === "de" ? "https://buy.stripe.com/test_8wM29tblf9F96SQcNF" : "" || // Deutsch
            locale === "kr" ? "https://buy.stripe.com/test_cN2cO7exrg3xcda3cU" : "" || // 한국어
            locale === "jp" ? "https://buy.stripe.com/test_fZe9BV4WR18D7WUdRR" : "" || // 日本語
            locale === "cn" ? "https://buy.stripe.com/test_28o5lF9d76sX5OMfZM" : "" || // 中文
            locale === "pt" ? "https://buy.stripe.com/test_28o01lcpj5oT0us6pm" : "",   // Português
      priceId:
        process.env.NODE_ENV === "development"
          ? locale === "it" ? "price_1PiMAhBvVijJQ1Wrf4kvFI9w" : "" || // Italiano
            locale === "en" ? "price_1PaOJnBvVijJQ1WrXqLRbQBK" : "" || // English
            locale === "fr" ? "price_1PiM6VBvVijJQ1WrOFk4COFx" : "" || // Français
            locale === "de" ? "price_1PiLzfBvVijJQ1WrR3wrcvxn" : "" || // Deutsch
            locale === "kr" ? "price_1PiLnDBvVijJQ1WrmhXBykEn" : "" || // 한국어
            locale === "jp" ? "price_1PiLYwBvVijJQ1WrGynnsBGU" : "" || // 日本語
            locale === "cn" ? "price_1PiLKdBvVijJQ1WrqcaGe8zj" : "" || // 中文
            locale === "pt" ? "price_1PiKx2BvVijJQ1Wr8nSuQPVr" : ""    // Português
          : 
            locale === "it" ? "price_1PiMAhBvVijJQ1Wrf4kvFI9w" : "" || // Italiano
            locale === "en" ? "price_1PaOJnBvVijJQ1WrXqLRbQBK" : "" || // English
            locale === "fr" ? "price_1PiM6VBvVijJQ1WrOFk4COFx" : "" || // Français
            locale === "de" ? "price_1PiLzfBvVijJQ1WrR3wrcvxn" : "" || // Deutsch
            locale === "kr" ? "price_1PiLnDBvVijJQ1WrmhXBykEn" : "" || // 한국어
            locale === "jp" ? "price_1PiLYwBvVijJQ1WrGynnsBGU" : "" || // 日本語
            locale === "cn" ? "price_1PiLKdBvVijJQ1WrqcaGe8zj" : "" || // 中文
            locale === "pt" ? "price_1PiKx2BvVijJQ1Wr8nSuQPVr" : "",   // Português
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
