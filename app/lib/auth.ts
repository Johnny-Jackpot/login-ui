'use server';

import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const sessions: Map<string, Object> = new Map();

export async function storeCredentials(sessionData: Object) {
  const sessionId = uuidv4();
  sessions.set(sessionId, sessionData);
  cookies().set('sessionId', sessionId);
}

export function getUserData() {
  const sessionId = cookies().get('sessionId')?.value;
  return sessionId ? sessions.get(sessionId) : null;
}

