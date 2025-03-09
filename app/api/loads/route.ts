import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from "@prisma/client";
// import { getSession } from "next-auth/react";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// const prisma = new PrismaClient();

export async function GET(_request: NextRequest, response: NextResponse) {
  const session = await getServerSession(authOptions as never);
  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  try {
    const loads = await prisma.loads.findMany({
        take: 100
    });

    return  new Response(loads, { status: 200, headers: { 'Content-Type': 'application/json' } }).json();
  } catch (error) {
    console.error(error)
    // @ts-expect-error Description: Prisma client type definitions are missing for the 'loads' table.
    return new Response(JSON.stringify({ message: error?.message }), { status: 500 });
  }
}
