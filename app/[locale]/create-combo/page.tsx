import CreateComboLayout from "@/components/CreateCombo/CreateComboLayout";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import CreatecomboPage from "./CreatecomboPage";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Create Combo",
};

type paramsProps = {
  params: {
    locale: string;
  };
};

const locales = ["en", "de", "fr", "it", "jp", "kr", "cn", "pt"];

export default function page({ params }: paramsProps) {
  return (
    <Suspense fallback={<div>Loading...123</div>}>
      <CreatecomboPage />
    </Suspense>
  );
}
