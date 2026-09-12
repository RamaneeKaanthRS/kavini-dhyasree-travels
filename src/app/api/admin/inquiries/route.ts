import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/adminAuth';

export async function GET(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        package: {
          select: { title: true }
        }
      }
    });
    return NextResponse.json(inquiries);
  } catch (err) {
    console.error('Error fetching inquiries:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = getAdminSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing inquiry ID or status' }, { status: 400 });
    }

    const updatedInquiry = await db.inquiry.update({
      where: { id },
      data: { status }
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        action: 'update_inquiry_status',
        details: `Updated inquiry ${id} status to ${status}`,
        adminEmail: session.email,
      },
    });

    return NextResponse.json(updatedInquiry);
  } catch (err) {
    console.error('Error updating inquiry:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
