//
'use server';
import { cookies } from 'next/headers';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const uploadImage = async (file: FormData) => {
  // formData.append('file', file);
  const auth = `Bearer ${cookies().get('access_token')?.value}`;

  try {
    const response = await fetch(
      `${API_HOST}/firebase/upload-sport-field-image`,
      {
        method: 'POST',
        headers: {
          Authorization: auth,
        },
        body: file,
      },
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    const res = await response.json();

    return res.data;
  } catch (error: any) {
    return {
      error: 'Failed to upload image',
    };
  }
};
