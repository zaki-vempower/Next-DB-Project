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
      take: 100,
      select: {
        id: true,
        dispatched_city: true,
        dispatched_state: true,
        created_at: true,
        pieces: true,
        spot_load: true,
        customer_id: true,
        carrier_id: true,
        equipment_type_id: true,
        sales_rep_id: true,
        carrier_rep_id: true,
        ref_num: true,
        status: true,
        invoice_total: true,
        carrier_total_rate: true,
        origin_city: true,
        origin_state: true,
        pickup_date: true,
        pickup_hours: true,
        destination_city: true,
        destination_state: true,
        delivery_date: true,
        delivery_hours: true,
        pickup_count: true,
        delivery_count: true,
        miles: true,
        pro: true,
        description: true,
      }
    });

    const responseBody = new ReadableStream({
      start(controller) {
        controller.enqueue(JSON.stringify(loads));
        controller.close();
      }
    });
    
    return new Response(responseBody, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error)
    // @ts-expect-error Description: Prisma client type definitions are missing for the 'loads' table.
    return new Response(JSON.stringify({ message: error?.message }), { status: 500 });
  }
}
