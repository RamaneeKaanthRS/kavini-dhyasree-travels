import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comparePassword, verify2FA, generateToken, SESSION_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, token } = body;

    if (!email || !password || !token) {
      return NextResponse.json({ error: 'Missing credentials or 2FA token' }, { status: 400 });
    }

    // Find admin user
    const admin = await db.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check password
    const isPasswordValid = await comparePassword(password, admin.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Check 2FA
    if (admin.twoFactorEnabled && admin.twoFactorSecret) {
      const is2FAValid = verify2FA(token, admin.twoFactorSecret);
      if (!is2FAValid) {
        return NextResponse.json({ error: 'Invalid 2FA token' }, { status: 401 });
      }
    }

    // Generate token
    const jwtToken = generateToken({ email: admin.email, userId: admin.id });

    // Write audit log
    await db.auditLog.create({
      data: {
        action: 'admin_login',
        details: 'Admin logged in successfully',
        adminEmail: email,
      },
    });

    const response = NextResponse.json({ success: true, email: admin.email });
    
    // Set cookie
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: jwtToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 2 // 2 hours
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
