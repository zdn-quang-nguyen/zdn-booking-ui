'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

type GetSportFieldParams = {
  page?: number;
  size?: number;
  typeId?: string;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const getSportFields = async ({
  page = 0,
  size = 12,
  typeId = 'all',
}: GetSportFieldParams) => {
  'use server';
  const accessToken = cookies().get('access_token')?.value;
  const sportFieldTypeParam =
    typeId === 'all' ? '' : `&sportFieldTypeId=${typeId}`;
  const res = await axios.get(
    `${API_HOST}/sport-field?${sportFieldTypeParam}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
        size,
      },
    },
  );

  return res.data;
};

export const getSportFieldById = async (id: string) => {
  'use server';
  const accessToken = cookies().get('access_token')?.value;

  const res = await axios.get(`${API_HOST}/sport-field/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
};
type GetSportFieldParamsByTime = {
  startTime: string;
  endTime: string;
  page?: number;
  size?: number;
  typeId?: string;
};

export const getSportFieldByTime = async ({
  startTime = new Date().toISOString(),
  endTime = new Date().toISOString(),
  page = 0,
  size = 4,
  typeId = 'all',
}: GetSportFieldParamsByTime) => {
  const accessToken = cookies().get('access_token')?.value;
  const sportFieldTypeParam =
    typeId === 'all' ? '' : `&sportFieldTypeId=${typeId}`;
  console.log(size, sportFieldTypeParam);
  try {
    const res = await axios.get(
      `${API_HOST}/sport-field/by-times?startTime=${startTime}&endTime=${endTime}${sportFieldTypeParam}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: { page: page - 1, size },
      },
    );
    return res.data.data;
  } catch (error) {
    return error;
  }
};

