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
                    replies: {
                        connect: {
                            id: parentId
                        }
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

export const CreateReply = async (FormData: FormData) => {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as User
    const text = FormData.get("text") as string
    const pathName = FormData.get("pathName") as string;
    const parentId = FormData.get("parentId") as string;
    const comboId = FormData.get("comboId") as string;

    const user = await prisma.user.findUnique({
        where: {
            id: userSession.id
        }
    });

    if (!user) {
        console.error("User not found / Unauthorized");
        return;
    }

    const reply = await prisma.replies.create({
        data: {
            text,
            user: {
                connect: {
                    id: user.id
                }
            },
            parent: {
                connect: {
                    id: parentId
                }
            },
            comboId
        },
    })

    revalidatePath(pathName);
    return reply;
}

export const DeleteComment = async (FormData: FormData) => {
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

export const DeleteReply = async (FormData: FormData) => {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as User
    const replyId = FormData.get("replyId") as string
    const pathName = FormData.get("pathName") as string;

    await prisma.replies.delete({
        where: {
            id: replyId,
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

export const UpdateReplyText = async (FormData: FormData) => {
    const replyId = FormData.get("replyId") as string
    const text = FormData.get("text") as string
    const pathName = FormData.get("pathName") as string;

    await prisma.replies.update({
        where: {
            id: replyId,
        },
        data: {
            text
        }
    })

    revalidatePath(pathName);
}

export const LikeComment = async (FormData: FormData) => {
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
        },
    });

    revalidatePath(pathName);
}

export const LikeReply = async (FormData: FormData) => {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as User
    const replyId = FormData.get("replyId") as string
    const pathName = FormData.get("pathName") as string;

    const reply = await prisma.replies.findUnique({
        where: {
            id: replyId,
        },
        include: {
            likes: true
        }
    })

    if (!reply) return;

    await prisma.replyLike.create({
        data: {
            replyId,
            userId: userSession.id,
        },
    });

    revalidatePath(pathName);
}

export const UnlikeComment = async (FormData: FormData) => {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as User
    const commentId = FormData.get("commentId") as string
    const pathName = FormData.get("pathName") as string;

    await prisma.commentLike.delete({
        where: {
            commentId_userId: {
                commentId,
                userId: userSession.id
            },
        }
    });

    revalidatePath(pathName);
}

export const UnlikeReply = async (FormData: FormData) => {
    const session = await getServerSession(authOptions);
    const userSession = session?.user as User
    const replyId = FormData.get("replyId") as string
    const pathName = FormData.get("pathName") as string;

    await prisma.replyLike.delete({
        where: {
            replyId_userId: {
                replyId,
                userId: userSession.id
            },
        }
    });

    revalidatePath(pathName);
}