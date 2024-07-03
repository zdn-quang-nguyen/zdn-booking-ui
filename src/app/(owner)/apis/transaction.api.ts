//
// ('use server');
'use client';
import axios from 'axios';
// import { cookies } from 'next/headers';
import Cookies from 'js-cookie';
const API_URL = 'http://localhost:5000';

export const getTransactions = async (filter: any) => {
  const auth = `Bearer ${Cookies.get('access_token')}`;

  try {
    const res = await axios.get(`http://localhost:5000/booking/transactions`, {
      headers: {
        Authorization: auth,
      },
      params: filter,
    });
    return res.data;
  } catch (error: any) {
    return {
      statusCode: 400,
      error: error,
      message: error,
    };
  }
};
