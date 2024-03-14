'use server';

import {cookies} from 'next/headers';
import {Credentials} from "@/app/lib/types";

export async function useMock(val: boolean) {
  cookies().set('use-mock', val ? '1' : '0');
}

export async function needUseMock() {
  const {value} = cookies().get('use-mock') || {};
  return value === '1';
}

export async function getMockAccessTokenData(): Promise<{ data: Credentials }> {
  const now = new Date();
  const tokenExpire = new Date();
  tokenExpire.setMinutes(tokenExpire.getMinutes() + 5);
  const refreshTokenExpire = new Date();
  refreshTokenExpire.setMinutes(refreshTokenExpire.getMinutes() + 10);

  return {
    data: {
      "error": 0,
      "detail": [
        null
      ],
      "timestamp": now.getTime() / 1000,
      "access_token": "access_token",
      "refresh_token": "refresh_token",
      "token_expire": tokenExpire.getTime() / 1000,
      "refresh_token_expire": refreshTokenExpire.getTime() / 1000,
    }
  };
}



