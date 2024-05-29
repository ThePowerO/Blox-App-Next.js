'use server';

import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export async function getComboById(comboId: string) {

    const data = await prisma.combo.findUnique({
        where: { id: comboId },
        select: {
            id: true,
            difficulty: true,
            author: true,
            slug: true,
            authorCreatedAt: true,
            authorImage: true,
            authorEmail: true,
            combotitle: true,
            combodescription: true,
            fightingstyle: true,
            weapon: true,
            fruit: true,
            sword: true,
            specialty: true,
            createdAt: true,
            updatedAt: true,
            mainStats: true,
            comboVideo: true,
            race: true,
            likes: {
                select: {
                    comboId: true,
                    userId: true,
                    createdAt: true,
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
        }  
    })

    return data;
}

const UpdateTitleSchema = z.object({
    comboId: z.string({
        invalid_type_error: "Invalid ComboId",
    }),
    comboTitle: z.string({
        invalid_type_error: "Invalid Title",
    }),
})

export async function UpdateComboTitle(FormData: FormData) {
    const pathName = FormData.get('pathName') as string
    const validatedFields = UpdateTitleSchema.safeParse({
        comboTitle: FormData.get('comboTitle'),
        comboId: FormData.get('comboId'),
    })

    if (!validatedFields.success) {
        return {
            erros: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { comboId, comboTitle } = validatedFields.data

    const data = await prisma.combo.update({
        where: {
            id: comboId
        },
        data: {
            combotitle: comboTitle
        },
    })

    revalidatePath(pathName)
    return data
}