import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const logs = await db.auditLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 200, // Limit to recent 200
    });
    return NextResponse.json(logs);
  } catch (err) {
    console.error('Error fetching audit logs:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
