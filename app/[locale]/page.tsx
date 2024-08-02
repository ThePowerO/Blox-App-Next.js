import Link from "next/link";
import { useTranslations } from "next-intl";
import { sendMail } from "@/lib/mail";
import LandingPage from "@/components/LandingPage/LandingPage";
import prisma from "@/lib/prisma";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user
  return (
    <LandingPage currentUser={currentUser} />
  )
}
