'use server';

import { cookies } from 'next/headers';
export async function useMock(val: boolean) {
  cookies().set('use-mock', val ? '1' : '0');
}

export async function needUseMock() {
  const {value} = cookies().get('use-mock') || {};
  return value === '1';
}



