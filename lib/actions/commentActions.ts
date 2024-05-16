'use server';

import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createComment = async (FormData: FormData) => {
    const session: any = await getServerSession(authOptions);
    const text = FormData.get("text") as string;
    const comboId = FormData.get("comboId") as string;
    const pathName = FormData.get("pathName") as string;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session?.user?.id
            }
        });

        if (!user) {
            console.error("User not found / Unauthorized");
            return;
        };

        const comment = await prisma.comment.create({
            data: {
                text,
                user: {
                    connect: {
                        id: user.id
                    }
                },
                combo: {
                    connect: {
                        id: comboId
                    }
                }
            },
            include: {
                combo: true,
                user: true,
                likes: true
            }
        });

        revalidatePath(pathName);
        return comment;
    } catch (error) {
        console.log("[ERROR_COMMENT_CREATION]", error);
        return;
    }

}