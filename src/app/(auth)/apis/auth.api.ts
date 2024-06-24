'use server';
import axios from 'axios';
import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://127.0.0.1:3000';
export const signUpUser = async (signUpInfo: any): Promise<any> => {
  try {
    const data = await axios.post(`${API_HOST}/v1/auth/sign-up`, signUpInfo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const signIn = async (username: string, password: string) => {
  const res = await axios.post(
    `${API_HOST}/v1/auth/login`,
    {
      email: username,
      password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );

  const accessToken: string = res.data?.access_token
    ? res.data.access_token
    : '';

  cookies().set('access_token', accessToken);

  return res.data;
};

export const createSocialUser = async (accessToken: string, role: string) => {
  const res = await axios.post(
    `${API_HOST}/v1/user/social-login`,
    {
      role,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return res.data;
};