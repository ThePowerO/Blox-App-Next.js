import UsersPage from "@/components/UsersPage/UsersPage";
import React from "react";
import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Users"
}

type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function page({ params }: paramsProps) {
  unstable_setRequestLocale(params.locale);

  const users = await prisma.user.findMany({
    include: {
      Combo: {
        include: {
          likes: true,
          favorites: true,
        },
      },
      comments: true,
    }
  });

  const session = await getServerSession(authOptions);
  const currentUser = session?.user;
  return (
    <UsersPage users={users as any} currentUser={currentUser} />
  );
}
