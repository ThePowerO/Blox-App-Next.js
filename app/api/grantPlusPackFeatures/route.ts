import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { add } from "date-fns";

export const POST = async (req: Request) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  try {
    const now = new Date();

    const expiredPlusPackWeeklyTime = await prisma.user.findMany({
      where: {
        isPlusPack: true,
        plusPackWeeklyTime: {
          lte: now,
        },
      },
    });

    for (const user of expiredPlusPackWeeklyTime) {
      await prisma.user.update({
        where: {
          id: user.id,
          isPlusPack: true,
        },
        data: {
          highlights: user.highlights + 15,
          plusPackWeeklyTime: add(now, { days: 7 }),
        },
      });
    }
  } catch (error) {
    console.error("Error resetting expired highlights:", error);
  }

  return NextResponse.json({ success: true }, { status: 200 });
};
