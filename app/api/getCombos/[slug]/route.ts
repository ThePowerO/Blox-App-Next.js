import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: any) {

    const comboSlug = params.slug

    try {
        const combo = await prisma.combo.findMany({
            where: {
                slug: comboSlug
            },
            select: {
                id: true,
                difficulty: true,
                author: true,
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
                favorites: true,
                likes: true
            }
        })

        return NextResponse.json({ message: "combos successfully fetched", combo }, { status: 200 });
    } catch (error) {
        console.log("[GETCOMBOS_BY_SLUG_ERROR]", error);
        return NextResponse.json({ message: "Error fetching combos" }, { status: 500 });
    }

}