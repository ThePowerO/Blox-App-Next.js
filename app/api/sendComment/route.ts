import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const POST = async (req: Request) => {

    if (req.method !== "POST") {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    const session = await getServerSession();

    try {
        const {
            text,
            comboId
        } = await req.json();

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const data = await prisma.comment.create({
            data: {
                text: text,
                user: {
                    connect: {
                        email: session?.user?.email!,
                    }
                },
                combo: {
                    connect: {
                        id: comboId
                    }
                }
            }
        })

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.log("[COMMENT_POST]",error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}