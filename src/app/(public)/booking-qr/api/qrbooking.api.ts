'use client';
import { message } from 'antd';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_HOST;
export const updateQrBooking = async (id: string) => {
  try {
    const res = await axios.patch(`${API_URL}/booking/update-qr-booking/${id}`);

    return res.data;
  } catch (error: any) {
    return {
      type: 'Error',
      message: error.response?.data.message,
    };
  }
};
