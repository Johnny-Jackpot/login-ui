import axios from "axios";
import {getMockAccessTokenData, needUseMock} from "@/app/lib/mock";

const baseUrl = 'https://auth-qa.qencode.com/v1/';

export async function login(email: string, password: string) {
  'use server';

  if (await needUseMock()) {
    return await getMockAccessTokenData();
  }

  const {data} = await axios.post(`${baseUrl}auth/login`, {email, password});
  return data;
}

export async function refreshToken(token: string) {
  'use server';

  if (await needUseMock()) {
    return getMockAccessTokenData();
  }

  const {data} = await axios.post(`${baseUrl}auth/refresh-token`, {refresh_token: token,});
  return data;
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
