
import { NextResponse } from 'next/server';
import { techStack } from '@/data/resources';

export async function GET(request: Request) {
    return NextResponse.json(techStack);
}
