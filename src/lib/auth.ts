import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { verifySync } from 'otplib';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-sathish-anna-travels';
export const SESSION_COOKIE_NAME = 'admin_session';

export interface AdminPayload {
  email: string;
  userId: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export function verify2FA(token: string, secret: string): boolean {
  try {
    const result = verifySync({
      secret,
      token
    });
    return result.valid;
  } catch (err) {
    console.error('2FA Verification Error:', err);
    return false;
  }
}
