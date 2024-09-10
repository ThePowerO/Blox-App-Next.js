  import React from 'react'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function About({ params }: paramsProps) {
  unstable_setRequestLocale(params.locale);

  const t = useTranslations("AboutPage");

  console.log("locale: ", params?.locale);

  return (
    <div>
      {t("h1")}
    </div>
  )
}
