import LandingPage from "@/components/LandingPage/LandingPage";
import { unstable_setRequestLocale } from "next-intl/server";

type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Home({ params }: paramsProps) {
  unstable_setRequestLocale(params.locale);

  console.log("locale: ", params?.locale);
  return (
    <LandingPage />
  )
}