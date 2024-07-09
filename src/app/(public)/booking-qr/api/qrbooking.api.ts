'use client';

import Cookies from 'js-cookie';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_HOST;

export const updateQrBooking = async (id: string) => {
  const auth = Cookies.get('access_token');
  if (!auth) {
    return {
      type: 'Error',
      message: 'Access token is missing',
    };
  }

  try {
    const res = await axios.patch(
      `${API_URL}/booking/update-qr-booking/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      },
    );

    return res.data;
  } catch (error: any) {
    return {
      type: 'Error',
      message: error.response?.data.message || error.message,
    };
  }
};
