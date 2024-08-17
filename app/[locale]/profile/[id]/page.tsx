import React from "react";
import 'react-image-crop/dist/ReactCrop.css'
import SingleProfilePage from "@/components/SingleProfilePage/SingleProfilePage";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: {
    id: string;
    locale: string;
  };
}

async function fetchData(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  })

  return user
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await fetchData(params.id);
  return {
    title: `${user?.name}`,
  };
}

export async function generateStaticParams() {
  // Fetch all users from the database
  const users = await prisma.user.findMany();

  // Define the list of locales you want to support
  const locales = ["en", "fr", "de", "it", "jp", "kr", "cn", "pt"];

  // Generate paths for each combination of slug and locale
  const paths = users.flatMap((user) =>
    locales.map((locale) => ({
      id: user.id,
      locale: locale,
    }))
  );

  return paths;
}

export default function page({ params }: Props) {
  unstable_setRequestLocale(params.locale);

  const { id } = params
  return (
    <SingleProfilePage ParamsUserId={id} />
  )
}
