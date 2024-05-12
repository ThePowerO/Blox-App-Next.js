import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: any) {

    const userId = params.id

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                likedCombos: true
            }
        })

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.log("[GETUSER_ERROR]", error);
        return NextResponse.json({ message: "Error Getting User" }, { status: 500 });
    }

}