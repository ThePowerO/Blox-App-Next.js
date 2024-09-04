"use server";

import prisma from "../prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function AnalyzeComboAction() {
  console.log("AnalyzeComboAction");
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: `generate good foods`
    }],
  })

  console.log("completition: ", completion.choices[0])
}
