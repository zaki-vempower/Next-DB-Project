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
    const trucks = await prisma.trucks.findMany({
        take: 100,
        select: {
          id: true,
          source: true,
          ref: true,
          carrier_id: true,
          equipment_type_id: true,
          team: true,
          available_date: true,
          truck_count: true,
          active: true,
          phone_number: true,
          email: true,
          city: true,
          state: true,
          lat: true,
          lng: true,
          created_at: true,
          updated_at: true,
          region_num: true,
          destination: true,
          notes: true,
          user_id: true,
          destination_lat: true,
          destination_lng: true,          truck_schedule_id: true,
          actual_user_id: true,
          source_email: true,
          load_id: true,
          load_truck_matches_old: {
            select: {             load_id: true,
            },
          },
        },
      });
      
      

    return res.status(200).json(trucks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: (error as Error)?.message || 'Internal Server Error' });
  }
}
