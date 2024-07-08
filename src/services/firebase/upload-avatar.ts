// import dotenv from 'dotenv';

// dotenv.config();

const API_HOST = process.env.REACT_APP_API_HOST;

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_HOST}/firebase/upload-avatar`, {
    method: 'POST',
    // headers: {
    //   'Access-Control-Allow-Origin': 'allowedOrigin' || '*',
    //   'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    //   'Access-Control-Allow-Headers':
    //     'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version',
    //   'Access-Control-Max-Age': '86400',
    // },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  const res = await response.json();

  return res.data;
};
