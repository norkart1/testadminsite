import { cookies } from 'next/headers';
import { db } from './db';

const SESSION_COOKIE = 'admin_session';

export async function createAuthSession(username: string, password: string) {
  const user = await db.getUserByUsername(username);
  
  if (!user || user.password !== password) {
    return null;
  }

  const userId = user._id?.toString();
  if (!userId) return null;

  const sessionId = await db.createSession(userId);
  if (!sessionId) return null;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
  });

  return { sessionId, user };
}

export async function getAuthSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionId) return null;

  const session = await db.getSession(sessionId);
  return session;
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  if (sessionId) {
    await db.deleteSession(sessionId);
  }

  cookieStore.delete(SESSION_COOKIE);
}
