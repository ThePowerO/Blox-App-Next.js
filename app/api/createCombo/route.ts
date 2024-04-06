// pages/api/createCombo.js
import prisma from "@/lib/prisma";
import { Combo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import slugify from 'slugify';

export const POST = async (req: Request) => {

    if (req.method !== "POST") {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    const session = await getServerSession();

    try {
        const {
            combotitle,
            combodescription,
            specialty,
            fightingstyle,
            weapon,
            fruit,
            sword,
            race,
            mainStats,
            comboVideo,
            authorCreatedAt,
            difficulty,
        } = await req.json();

        if (!session?.user) {
            return NextResponse.json({ message: 'User session not available' }, { status: 401 });
        }

        const slugTitle = slugify(combotitle, { lower: true, strict: true });

        const result = await prisma.combo.create({
            data: {
                slug: slugTitle,
                difficulty,
                combotitle,
                combodescription,
                specialty,
                race,
                mainStats,
                comboVideo,
                fightingstyle,
                weapon,
                fruit,
                sword,
                author: session?.user?.name!,
                authorImage: session?.user?.image || "",
                authorEmail: session?.user?.email || "",
                authorCreatedAt,
                user: {
                    connect: {
                        id: session?.user?.id,
                        email: session?.user?.email!,
                        image: session?.user?.image!,
                        name: session?.user?.name!,
                        password: session?.user?.password!,
                        createdAt: session?.user?.createdAt!,
                        updatedAt: session?.user?.updatedAt!,
                    }
                },
            },
        });

        return NextResponse.json({ message: 'Combo creation was successful', result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error', error }, { status: 500 });
    }
}
