'use client';

import React from "react";
import { ContentForAi } from "@/app/[locale]/about/ContentForAi";
import TextareaAutosize from "react-textarea-autosize";

export default function PromptForAi() {
  return (
    <>
      <textarea className="w-full h-screen" value={ContentForAi} readOnly />
    </>
  );
}
