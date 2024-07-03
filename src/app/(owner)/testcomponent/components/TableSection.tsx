'use client';
import { generateColumns, generateRows } from '@/libs/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import ScheduleTable from './ScheduleTable';

interface TableProps {
  bookingResponse: BookingResponse;
  SportFieldTimeProps: {
    startTimeSportField: string;
    endTimeSportField: string;
  };
  startDateSchedule: Date;
  endDateSchedule: Date;
  setStartDateSchedule: (date: Date) => void;
  setEndDateSchedule: (date: Date) => void;
}

export enum CheckStatus {
  CHECKED_BOOKING = 'checked_booking',
  UNCHECKED_BOOKING = 'unchecked_booking',
  DEFAULT = 'default',
}

const TableSection = (props: TableProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { bookingResponse } = props;
  const { startTimeSportField, endTimeSportField } = props.SportFieldTimeProps;
  const {
    startDateSchedule,
    endDateSchedule,
    setStartDateSchedule,
    setEndDateSchedule,
  } = props;

  console.log(startDateSchedule, endDateSchedule);

  const handleNextWeek = () => {
    setStartDateSchedule(
      new Date(startDateSchedule.setDate(startDateSchedule.getDate() + 7)),
    );
    setEndDateSchedule(
      new Date(endDateSchedule.setDate(endDateSchedule.getDate() + 7)),
    );
  };

  const handlePrevWeek = () => {
    setStartDateSchedule(
      new Date(startDateSchedule.setDate(startDateSchedule.getDate() - 7)),
    );
    setEndDateSchedule(
      new Date(endDateSchedule.setDate(endDateSchedule.getDate() - 7)),
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('startDate', startDateSchedule.toISOString());
    params.set('endDate', endDateSchedule.toISOString());

    router.push(`${pathname}?${params.toString()}`);
  }, [startDateSchedule, endDateSchedule]);

  const labelColumns = generateColumns(startTimeSportField, endTimeSportField);
  const labelRows = generateRows(startDateSchedule);

  console.log(labelColumns);

  console.log(labelRows);
  return (
    <div>
      {' '}
      <button onClick={handlePrevWeek}>Previous Week</button>
      <button onClick={handleNextWeek}>Next Week</button>
      <ScheduleTable
        bookingResponse={bookingResponse}
        labelColumns={labelColumns}
        labelRows={labelRows}
      />
    </div>
  );
};

export default TableSection;
