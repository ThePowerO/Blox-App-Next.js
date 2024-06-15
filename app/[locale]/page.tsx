import Link from "next/link";
import { useTranslations } from "next-intl";
import { sendMail } from "@/lib/mail";
import LandingPage from "@/components/LandingPage/LandingPage";
import prisma from "@/lib/prisma";

export default function Home() {

  const t = useTranslations("Home");

  return (
    <LandingPage />
  )
}
