import axios from "axios";
import {getUserData} from "@/app/lib/auth";

const baseUrl = 'https://auth-qa.qencode.com/v1/';

export async function login(email: string, password: string) {
  'use server';

  return axios.post(`${baseUrl}auth/login`, {email, password});
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
