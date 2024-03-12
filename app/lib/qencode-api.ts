import axios from "axios";
import {getUserData} from "@/app/lib/auth";
import {needUseMock} from "@/app/lib/mock";

const baseUrl = 'https://auth-qa.qencode.com/v1/';

export async function login(email: string, password: string) {
  'use server';

  const useMockForApi = await needUseMock();
  return useMockForApi
    ? Promise.resolve({
      "error": 0,
      "detail": [
        null
      ],
      "timestamp": 1709814840.077122,
      "access_token": "",
      "refresh_token": "string",
      "token_expire": 0,
      "refresh_token_expire": 0
    })
    : axios.post(`${baseUrl}auth/login`, {email, password});
}

export async function refreshToken() {
  'use server';

  const userData = await getUserData();
  if (!userData) {
    throw new Error('No user');
  }

  return axios.post(`${baseUrl}auth/refresh-token`, {
    refresh_token: userData.refresh_token,
  })
}

export async function resetPassword(email: string) {
  return axios.post(`${baseUrl}auth/password-reset`, {email});
}

export async function setNewPassword(token: string, secret: string, password: string, passwordConfirm: string) {
  return axios.post(`${baseUrl}auth/password-set`, {
    token,
    secret,
    password,
    password_confirm: passwordConfirm,
  });
}
