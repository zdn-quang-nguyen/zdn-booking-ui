'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const getBookingsByFieldId = async (
  fieldId: string,
  startTime: Date,
  endTime: Date,
) => {
  const accessToken = cookies().get('access_token')?.value;
  const response = await fetch(
    `${API_HOST}/booking?fieldId=${fieldId}&startTime=${startTime.toISOString()}&endTime=${endTime.toISOString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const json = await response.json();

  return json.data;
};
export const getBookingById = async (id: string) => {
  console.log(id);
  const accessToken = cookies().get('access_token')?.value;
  const response = await fetch(`${API_HOST}/booking/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const json = await response.json();

  return json.data;
};
export const removeBookingById = async (id: string) => {
  console.log(id);
  const accessToken = cookies().get('access_token')?.value;
  const response = await fetch(`${API_HOST}/booking/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  const json = await response.json();

  return json.data;
};
