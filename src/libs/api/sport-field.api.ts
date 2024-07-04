import axiosInstance from '../axios';

type GetSportFieldParams = {
  page?: number;
  size?: number;
  query?: string;
  typeId?: string;
  location?: string;
};

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
<<<<<<< HEAD
// export const getSportFields = async ({
//   page = 1,
//   size = 12,
//   query = '',
//   typeId = 'all',
//   location,
// }: GetSportFieldParams) => {
//   ('use server');

//   if (isNaN(page) || isNaN(size)) {
//     page = 1;
//   }
//   const accessToken = cookies().get('access_token')?.value;
//   const sportFieldTypeParam =
//     typeId === 'all' ? '' : `&sportFieldTypeId=${typeId}`;
//   const locationParam = location ? `&location=${location}` : '';
//   const res = await axios.get(
//     `${API_HOST}/sport-field?page=${page - 1}&size=${size}&filter=name:${query}${sportFieldTypeParam}${locationParam}`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     },
//   );

//   return res.data;
// };
=======
export const getSportFields = async ({
  page = 1,
  size = 12,
  query = '',
  typeId = 'all',
}: GetSportFieldParams) => {
  if (isNaN(page) || isNaN(size)) {
    page = 1;
  }

  // const accessToken = cookies().get('access_token')?.value;
  const sportFieldTypeParam =
    typeId === 'all' ? '' : `&sportFieldTypeId=${typeId}`;
  const res = await axiosInstance.get(
    `/sport-field?page=${page - 1}&size=${size}&filter=name:${query}${sportFieldTypeParam}`,
  );

  return res.data;
};
>>>>>>> da1954dcf3ecdf9d5970ef0f55aa153de86f0f17

export const getSportFieldById = async (id: string) => {
  // const accessToken = cookies().get('access_token')?.value;

  const res = await axiosInstance.get(`${API_HOST}/sport-field/${id}`);

  return res.data;
};

<<<<<<< HEAD
export const getSportFields = async ({
  page = 1,
  size = 12,
  query = '',
  location = '',
  typeId = 'all',
}: GetSportFieldParams) => {
  'use server';
  const accessToken = cookies().get('access_token')?.value;
  const filter = {
    query: query,
    location: location,
    type: typeId,
    page: page - 1,
    limit: size,
  };

  try {
    const res = await axios.get(`${API_HOST}/sport-field`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
=======

>>>>>>> da1954dcf3ecdf9d5970ef0f55aa153de86f0f17
