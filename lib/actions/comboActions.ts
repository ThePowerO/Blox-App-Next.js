'use server';

import { getServerSession} from "next-auth";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Combo } from "../types";

export async function addComboLike(FormData: FormData) {
    const session = await getServerSession(authOptions);
    const comboId = FormData.get("comboId") as string;
    const userId = FormData.get("userId") as string;
    const pathName = FormData.get("pathName") as string;

    try {
        const combo = await prisma.combo.findUnique({
            where: {
                id: comboId,
            },
            include: {
                likes: true,
            }
        })

        const isLiked = combo?.likes.find((like) => like.userId === userId); // ou like.some

        //if (isLiked) {
        //    console.log("Combo already liked / Removing like.");
        //    await prisma.like.delete({
        //        where: {
        //            comboId_userId: {
        //                comboId,
        //                userId,
        //            }
        //        }
        //    })
        //} else {
        //    console.log("Combo not liked / Adding like.");
        //   
        //}

        await prisma.like.create({
            data: {
                comboId,
                userId,
            }
        })

        revalidatePath(pathName);
    } catch (error) {
        console.error(error);
    }
}

export async function removeComboLike(FormData: FormData) {
    const session: any = await getServerSession(authOptions);
    const comboId = FormData.get("comboId") as string;
    const pathName = FormData.get("pathName") as string;

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!,
        },
    });

    if (!user) {
        console.error("User not found.");
        return;
    }

    await prisma.like.delete({
        where: {
            comboId_userId: {
                comboId,
                userId: session?.user?.id,
            },
        }
    });

    revalidatePath(pathName);
}


export async function addFavoriteCombo(formData: FormData) {
    const session = await getServerSession(authOptions);
    const comboId = formData.get("comboId") as string;
    const pathName = formData.get("pathName") as string;

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!,
        },
        include: {
            favorites: true,
        }
    });

    if (!user) {
        console.error("User not found.");
        return;
    }

    const combo = await prisma.combo.findUnique({
        where: {
            id: comboId,
        },
        include: {
            favorites: true,
            likes: true,
        }
    })

    if (!combo) {
        console.error("Combo not found.");
        return;
    }

    const isFavorite = user.favorites.some((favorite) => favorite.comboId === comboId);

    if (isFavorite) {
        console.log("Combo already favorite.");
        return;
    } else {
        await prisma.favorite.create({
            data: {
                user: {
                    connect: {
                        email: session?.user?.email!,
                    },
                },
                combo: {
                    connect: {
                        id: comboId,
                    },
                },
            },
        });

        revalidatePath(pathName);
    }
}

export async function removeFavoriteCombo(formData: FormData) {
    const session = await getServerSession(authOptions);

    const favoriteId = formData.get("favoriteId") as string;
    const pathName = formData.get("pathName") as string;

    const user = await prisma.user.findUnique({
        where: {
            email: session?.user?.email!,
        },
    });

    if (!user) {
        console.error("User not found.");
        return;
    }

    await prisma.favorite.delete({
        where: { id: favoriteId },
    })

    revalidatePath(pathName);
}

export async function deleteCombo(formData: FormData) {
    const comboId = formData.get("comboId") as string;
    const pathName = formData.get("pathName") as string;

    const combo = await prisma.combo.delete({
        where: { id: comboId },
    });

    revalidatePath(pathName);
}

export async function getSlugCombo(slug: string) {
    const session = await getServerSession(authOptions);

    const data = await prisma.combo.findUnique({
        where: { slug: slug },
        select: {
            id: true,
            difficulty: true,
            author: true,
            slug: true,
            authorCreatedAt: true,
            authorImage: true,
            combotitle: true,
            combodescription: true,
            fightingstyle: true,
            weapon: true,
            fruit: true,
            sword: true,
            specialty: true,
            createdAt: true,
            mainStats: true,
            comboVideo: true,
            race: true,
            comments: {
                select: {
                    id: true,
                    text: true,
                    userName: true,
                    userImage: true,
                    createdAt: true,
                    user: {
                        select: {
                            name: true,
                            image: true,
                            id: true
                        }
                    },
                    likes: {
                        select: {
                            id: true,
                            commentId: true,
                            userId: true,
                            createdAt: true,
                        }
                    }
                }
            },
            user: {
                select: {
                    name: true,
                    image: true,
                    id: true
                }
            },         
            favorites: {
                select: {
                    id: true,
                    comboId: true,
                    userId: true,
                    createdAt: true,
                }
            },
            likes: {
                select: {
                    comboId: true,
                    userId: true,
                    createdAt: true,
                }
            }
          }
    })

    return data;
}