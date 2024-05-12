import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function POST(request: NextRequest, { params }: any) {

    const comboId = params.slug
    const session: any = await getServerSession(authOptions);
    try {
        if (!session?.user) {
            return NextResponse.json({ message: 'User session not available' }, { status: 401 });
        }

        const userId = session.user.id

        const combo = await prisma.combo.findUnique({
            where: {
                id: comboId
            },
            include: {
                likes: true
            }
        })

        if (!combo) {
            return NextResponse.json({ message: 'Combo not found' }, { status: 404 });
        }

        const isLiked = combo.likes.find((like) => like.comboId === combo.id); // ou like.some

        if (isLiked) {
            console.log("Combo already liked / Removing like.");
            await prisma.like.delete({
                where: {
                    comboId_userId: {
                        comboId: comboId,
                        userId
                    }
                }
            })
        } else {
            console.log("Combo not liked / Adding like.");
            const data = await prisma.like.create({
                data: {
                    comboId: comboId,
                    userId
                }
            })
            return data
        }

        return NextResponse.json({ message: "Liked combo", data: combo },  { status: 200 });
    } catch (error) {
        console.log("[POSTLIKE_ERROR]", error);
        return NextResponse.json({ message: "Error Liking Combo" }, { status: 500 });
    }

}