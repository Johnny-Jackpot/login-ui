'use server';

import {saveData, getData, removeData} from "@/app/lib/storage";
import {Credentials} from "@/app/lib/types";
import {refreshToken} from "@/app/lib/qencode-api";

export async function storeCredentials(data: Credentials) {
  await saveData('accessTokenData', data);
}

export async function getUserData(): Promise<Credentials|null> {
  const cred: Credentials|null = await getData('accessTokenData');
  if (!cred) {
    return null;
  }

  const now = new Date();

  const {token_expire, refresh_token_expire, refresh_token} = cred;
  const tokenExpireDate = new Date(Math.floor(token_expire * 1000));
  if (now.getTime() < tokenExpireDate.getTime()) {
    return cred;
  }

  const refreshTokenExpireDate = new Date(Math.floor(refresh_token_expire * 1000));
  if (refreshTokenExpireDate.getTime() < now.getTime()) {
    await removeData('accessTokenData');
    return null;
  }

  try {
    const newCred = await refreshToken(refresh_token);
    await storeCredentials(newCred);

    return newCred;
  } catch (e) {
    return null;
  }
}

