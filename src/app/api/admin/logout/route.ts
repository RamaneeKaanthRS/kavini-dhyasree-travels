import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    let adminEmail = 'unknown';

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        adminEmail = decoded.email;
      }
    }

    // Write audit log
    await db.auditLog.create({
      data: {
        action: 'admin_logout',
        details: 'Admin logged out',
        adminEmail,
      },
    });

    const response = NextResponse.json({ success: true });
    
    // Clear cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0 // Expire immediately
    });

    return response;
  } catch (err) {
    console.error('Logout error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
