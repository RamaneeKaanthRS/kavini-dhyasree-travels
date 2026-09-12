import { NextRequest } from 'next/server';
import { verifyToken, SESSION_COOKIE_NAME, AdminPayload } from './auth';

export function getAdminSession(req: NextRequest): AdminPayload | null {
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
