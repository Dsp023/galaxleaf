
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const domain = searchParams.get('domain');
        const category = searchParams.get('category');
        const search = searchParams.get('search');

        const whereClause: any = {
            status: 'APPROVED',
        };

        if (domain) {
            whereClause.domain = domain;
        }

        if (category) {
            whereClause.category = category;
        }

        if (search) {
            whereClause.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        const resources = await prisma.resource.findMany({
            where: whereClause,
            orderBy: {
                name: 'asc',
            },
        });

        return NextResponse.json(resources);
    } catch (error) {
        console.error('Error fetching resources:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
