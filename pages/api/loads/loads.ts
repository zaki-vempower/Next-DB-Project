import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions as never);
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
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
      },
    });

    return res.status(200).json(loads);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: (error as Error)?.message || 'Internal Server Error' });
  }
}
