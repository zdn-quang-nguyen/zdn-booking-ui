'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import TableSection from './components/TableSection';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const fetchAccessToken = () => {
  return (
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1] ?? ''
  );
};

const fetcher = (url: string, token: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);

type OwnerHomePageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
};

const getStartOfWeek = (date: Date): Date => {
  const result = new Date(date); // Create a copy to avoid mutating the original date
  result.setDate(
    result.getDate() - result.getDay() + (result.getDay() === 0 ? -6 : 1),
  );
  return new Date(result.setHours(0, 0, 0, 0)); // Set time to the start of the day
};

const getEndOfWeek = (date: Date): Date => {
  const result = new Date(getStartOfWeek(date));
  result.setDate(result.getDate() + 6);
  return new Date(result.setHours(23, 59, 59, 999)); // Set time to the end of the day
};

const OwnerHomePage = async ({ searchParams }: OwnerHomePageProps) => {
  const [accessToken, setAccessToken] = useState('');
  const [fieldId, setFieldId] = useState(searchParams?.fieldId);
  const [startDateSchedule, setStartDateSchedule] = useState<Date>(
    new Date(searchParams?.startDate ?? getStartOfWeek(new Date())),
  );
  const [endDateSchedule, setEndDateSchedule] = useState<Date>(
    new Date(
      searchParams?.endDate ?? getEndOfWeek(new Date(startDateSchedule)),
    ),
  );

  useEffect(() => {
    setAccessToken(fetchAccessToken());
  }, []);

  const status = 'accepted';

  const params = new URLSearchParams({
    fieldId: fieldId || '',
    startTime: startDateSchedule.toISOString(),
    endTime: endDateSchedule.toISOString(),
    ...(status && { status }),
  });

  const {
    data: bookingData,
    error: bookingError,
    isLoading: bookingLoading,
  } = useSWR(
    accessToken ? `${API_HOST}/booking/user?${params.toString()}` : null,
    (url) => fetcher(url, accessToken),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  const {
    data: sportFieldData,
    error: sportFieldError,
    isLoading: sportFieldLoading,
  } = useSWR(
    accessToken ? `${API_HOST}/field/${fieldId}` : null,
    (url) => fetcher(url, accessToken),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (!bookingData || bookingLoading || !sportFieldData || sportFieldLoading) {
    return <div>Loading...</div>;
  }

  const { startTime: startTimeSportField, endTime: endTimeSportField } =
    sportFieldData.data.sportField;

  const nameSportField = sportFieldData.data.sportField.name;

  return (
    <div>
      <TableSection
        bookingResponse={bookingData.data}
        SportFieldTimeProps={{
          startTimeSportField: startTimeSportField,
          endTimeSportField: endTimeSportField,
          nameSportField: nameSportField,
        }}
        startDateSchedule={startDateSchedule}
        endDateSchedule={endDateSchedule}
        setStartDateSchedule={setStartDateSchedule}
        setEndDateSchedule={setEndDateSchedule}
      />
    </div>
  );
};

export default OwnerHomePage;
