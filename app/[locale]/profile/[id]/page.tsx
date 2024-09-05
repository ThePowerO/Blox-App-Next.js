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

export default function page({ params }: Props) {
  const { id } = params
  return (
    <SingleProfilePage ParamsUserId={id} />
  )
}
