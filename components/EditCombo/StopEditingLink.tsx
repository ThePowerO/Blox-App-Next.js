'use client';

import { useLocale } from "@/LocaleContext";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function StopEditingLink({ comboSlug }: { comboSlug: string }) {
  const { locale } = useLocale();
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push(`/${locale}/combos/${comboSlug}`)}
      className="flex text-sm hover:underline cursor-pointer items-center gap-[5px] mr-[10px]"
    >
      <MoveLeft size={15} />
      Stop Editing
    </button>
  );
}
