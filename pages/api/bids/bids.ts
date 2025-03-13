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
    const bids = await prisma.bids.findMany({
        take: 100,
        select: {
          id: true,
          load_id: true,
          carrier_id: true,
          status: true,
          ask_price: true,
          note: true,
          user_id: true,
          created_at: true,
          updated_at: true,
          phone: true,
          actual_bid_id: true,
          void: true,
          bids: {
            select: {
              id: true, // Selecting the referenced bid's ID (modify as needed)
              status: true, // Example: Select specific fields from related bids
            },
          },
          other_bids: {
            select: {
              id: true,
              status: true,
            },
          },
        },
      });
      

    return res.status(200).json(bids);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: (error as Error)?.message || 'Internal Server Error' });
  }
}
