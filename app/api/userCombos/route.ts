// api/userCombos/route.ts

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  if (req.method !== "GET") {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const session = await getServerSession();

  try {
    if (!session?.user) {
      return NextResponse.json({ message: 'User session not available' }, { status: 401 });
    }

    const user_combos = await prisma.combo.findMany({
      where: {
        author: session?.user.name!,
      },
    });

    return NextResponse.json({ message: "combos successfully fetched", user_combos }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user combos:', error);
    return NextResponse.json({ message: "Error fetching user combos" }, { status: 500 });
  }
};
