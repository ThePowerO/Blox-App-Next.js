'use server';

import { getServerSession } from "next-auth";
import prisma from "../prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createComment = async (FormData: FormData) => {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as User    
    const text = FormData.get("text") as string;
    const comboId = FormData.get("comboId") as string;
    const pathName = FormData.get("pathName") as string;
    const parentId = FormData.get("parentId") as string; // Comment ID

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userSession.id,
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
                },
                ...(parentId && {
                    parent: {
                        connect: {
                            id: parentId,
                        },
                    }
                })
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

export const DeleteCommentAction = async (FormData: FormData) => {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as User
    const commentId = FormData.get("commentId") as string
    const pathName = FormData.get("pathName") as string;

    await prisma.comment.delete({
        where: {
            id: commentId,
            userId: userSession.id,
        }
    });

    revalidatePath(pathName);
}

export const UpdateCommentText = async (FormData: FormData) => {
    const commentId = FormData.get("commentId") as string
    const text = FormData.get("text") as string
    const pathName = FormData.get("pathName") as string;

    await prisma.comment.update({
        where: {
            id: commentId,
        },
        data: {
            text
        }
    })

    revalidatePath(pathName);
}

export const LikeCommentAction = async (FormData: FormData) => {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as User
    const commentId = FormData.get("commentId") as string
    const pathName = FormData.get("pathName") as string;

    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
        include: {
            likes: true
        }
    })

    if (!comment) return;

    await prisma.commentLike.create({
        data: {
            commentId,
            userId: userSession.id,
        }
    });

    revalidatePath(pathName);
}

export const UnlikeCommentAction = async (FormData: FormData) => {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as User
    const commentId = FormData.get("commentId") as string
    const pathName = FormData.get("pathName") as string;

    await prisma.commentLike.delete({
        where: {
            commentId_userId: {
                commentId,
                userId: userSession.id
            }
        }
    });

    revalidatePath(pathName);
}