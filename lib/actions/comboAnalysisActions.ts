"use server";

import prisma from "../prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function AnalyzeComboAction() {
  console.log("AnalyzeComboAction");
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18",
    messages: [{
      role: "user",
      content: `generate healthy foods recipes`
    }],
  })

  console.log("completition: ", completion)

  console.log("completition.choices: ", completion.choices[0])
  console.log("completition.choices.messages: ", completion.choices[0].message)
  console.log("completition.choices.messages.content: ", completion.choices[0].message.content)
}
