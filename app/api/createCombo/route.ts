// pages/api/createCombo.js
import prisma from "@/lib/prisma";
import { Combo } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import slugify from 'slugify';
import { authOptions } from "../auth/[...nextauth]/authOptions";

export const POST = async (req: Request) => {

    const session: any = await getServerSession(authOptions);

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

        const slugTitle = encodeURIComponent(combotitle).replace(/%20/g, '-');

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
