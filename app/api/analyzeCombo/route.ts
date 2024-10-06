 import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    console.log("AnalyzeComboAction");
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "user",
          content: `generate healthy foods recipes`,
        },
      ],
    });

    console.log("completition: ", completion);

    console.log("completition.choices: ", completion.choices[0]);
    console.log(
      "completition.choices.messages: ",
      completion.choices[0].message
    );

    return NextResponse.json({ completion }, { status: 200 });
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};
