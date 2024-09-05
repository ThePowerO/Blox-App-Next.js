import Link from "next/link";
import { useTranslations } from "next-intl";
import { sendMail } from "@/lib/mail";
import LandingPage from "@/components/LandingPage/LandingPage";
import prisma from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { unstable_setRequestLocale } from "next-intl/server";

type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];


export default async function Home({ params }: paramsProps) {

  const session = await getServerSession(authOptions);
  const currentUser = session?.user
  console.log("locale: ", params?.locale);
  return (
    <LandingPage currentUser={currentUser} />
  )
}