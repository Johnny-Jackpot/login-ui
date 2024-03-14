'use server';

/**
 * Using cookies for demo purposes, consider using database for production
 */

import { cookies } from 'next/headers';

export async function saveData(key: string, data: object) {
  cookies().set(key, JSON.stringify(data));
}

export async function getData(key: string): Promise<any|null> {
  const json = cookies().get(key)?.value;
  return json ? JSON.parse(json) : null;
}

export async function removeData(key: string) {
  cookies().delete(key);
}
