import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { add } from "date-fns";

export const POST = async (req: NextRequest) => {

  if (req.method !== "POST") {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const now = new Date();

    const expiredCombos = await prisma.combo.findMany({
      where: {
        highlight: "HIGHLIGHTED",
        highlightExpiration: {
          lte: now,
        },
      },
    });

    console.log("Expired combos:", expiredCombos);

    if (expiredCombos.length === 0) {
      return NextResponse.json({ message: "No expired combos found" }, { status: 404 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: expiredCombos[0].userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    for (const combo of expiredCombos) {
      if (combo.isAutoRenovate === true) {
        if (user.highlights === 0) {
          console.log("User does not have any highlights");
          await prisma.combo.update({
            where: {
              id: combo.id,
              isAutoRenovate: true,
            },
            data: {
              highlight: "NONE",
              highlightExpiration: null,
              isAutoRenovate: false,
            },
          });
          return NextResponse.json({ message: "User does not have any highlights" }, { status: 404 });
        } else {
          let UserHighlightExpirationTime;
          if (user.isPlusPack !== false && user.proPack >= 1) {
            UserHighlightExpirationTime = 3;
          } else if (user.isPlusPack === true) {
            UserHighlightExpirationTime = 3;
          } else if (user.proPack >= 1) {
            UserHighlightExpirationTime = 2;
          } else if (user.proPack === 0 && user.isPlusPack === false) {
            UserHighlightExpirationTime = 1;
          }

          console.log("Renovating combo!:", combo.id);
          await prisma.combo.update({
            where: {
              id: combo.id,
              isAutoRenovate: true,
            },
            data: {
              highlight: "HIGHLIGHTED",
              highlightExpiration: add(now, {
                days: UserHighlightExpirationTime,
              }),
            },
          });

          await prisma.user.update({
            where: {
              id: combo?.userId!,
            },
            data: {
              highlights: user.highlights - 1,
            },
          });
        }
      } else {
        console.log("Resetting combo!:", combo.id);
        await prisma.combo.updateMany({
          where: {
            highlight: "HIGHLIGHTED",
            highlightExpiration: {
              lte: now,
            },
          },
          data: {
            highlight: "NONE",
            highlightExpiration: null,
          },
        });
      }
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error resetting expired highlights:", error);
    return NextResponse.json({ message: "Error resetting expired highlights" }, { status: 500 });
  }
};
