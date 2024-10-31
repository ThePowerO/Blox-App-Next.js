




import React from "react";
import { unstable_setRequestLocale } from "next-intl/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import AnalyzeComboAction from "@/lib/actions/comboAnalysisActions";

type paramsProps = {
  params: {
    locale: string;
  };
};

import OpenAI from "openai";
import ManageSubscriptionBtn from "../profile/ManageSubscriptionBtn";
import { ContentForAi } from "./ContentForAi";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const locales = ["en", "de", "fr", "it", "jp", "kr", "cn", "pt"];

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function About({ params }: paramsProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <div className="flex flex-col gap-4">
      <form>
        <Button
          className="w-fit"
          formAction={async (combo: any) => {
            "use server";
            console.log("Start of AnalyzeComboAction");
            try {

              const preemptedPrompt = `I'm using light fruit, what combos can i use? And Explain each combo in detail.`;

              const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini-2024-07-18",
                messages: [
                  {
                    role: "system",
                    content: `
                    You are an AI designed to analyze Combo Builds from Blox Fruits which is a game from Roblox. 
                    - DO NOT ANSWER ANY QUESTIONS OR OTHER TOPICS THAT ARE NOT RELATED TO THE GAME BLOX FRUITS FROM ROBLOX.
                    You will have the following information: https://blox-app-next-js.vercel.app/en/ai-content
                    `,
                  },
                  {
                    role: "user",
                    content: preemptedPrompt,
                  },
                ],
              });
              console.log("completition: ", completion);
              console.log("completition.choices: ", completion.choices[0]);
              console.log(
                "completition.choices.messages: ",
                completion.choices[0].message
              );
              console.log(
                "completition.choices.messages.content: ",
                completion.choices[0].message.content
              );
            } catch (error) {
              console.log("error analyzing combo", error);
            }
          }}
          variant="outline"
        >
          Analyze Combo
        </Button>
      </form>
      <form>
        <Button
          className="w-fit"
          formAction={async () => {
            "use server";
            console.log("Server action triggered");
            return "Test completed!";
          }}
          variant="outline"
        >
          Test Action
        </Button>
      </form>

      <ManageSubscriptionBtn />
    </div>
  );
}
