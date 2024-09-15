import React from "react";
import { ContentForAi } from "@/app/[locale]/about/ContentForAi";
import { Textarea } from "@/components/ui/textarea";
import PromptForAi from "./PromptForAi";

export default function page() {
  return (
    <div className="w-full h-full">
      <PromptForAi />
    </div>
  );
}
