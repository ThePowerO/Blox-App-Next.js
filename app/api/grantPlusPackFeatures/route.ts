import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { add } from "date-fns";

export const POST = async (req: NextRequest) => {

  if (req.method !== "POST") {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
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

    if (expiredPlusPackWeeklyTime.length === 0) {
      return NextResponse.json({ message: "No expired plus pack weekly time found" }, { status: 200 });
    }

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
    
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error resetting expired highlights:", error);
    return NextResponse.json({ message: "Error resetting expired highlights" }, { status: 500 });
  }
};
