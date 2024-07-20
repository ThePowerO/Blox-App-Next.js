import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
      select: {
        proPack: true,
        starterPack: true,
        isPlusPack: true,
        id: true,
        ComboCountLimit: {
          select: {
            count: true,
          }
        }
      }
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log("[GET_USER_ERROR]", error);
    return new NextResponse("Getting user went wrong", { status: 500 });
  }
};
