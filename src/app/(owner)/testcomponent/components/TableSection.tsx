'use client';
import { cn, generateColumns, generateRows } from '@/libs/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import ScheduleTable from './ScheduleTable';
import styles from './ScheduleTable.module.scss';
import {
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';

interface TableProps {
  bookingResponse: BookingResponse[];
  SportFieldTimeProps: {
    startTimeSportField: string;
    endTimeSportField: string;
    nameSportField: string;
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
  const { startTimeSportField, endTimeSportField, nameSportField } =
    props.SportFieldTimeProps;
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.getAttribute('data-id');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (status === CheckStatus.UNCHECKED_BOOKING) {
      const nextSibling =
        e.target.parentElement?.nextElementSibling?.getElementsByTagName(
          'input',
        )[0];
      const previousSibling =
        e.target.parentElement?.previousElementSibling?.getElementsByTagName(
          'input',
        )[0];

      if (
        (!nextSibling?.checked || nextSibling.getAttribute('date-id')) &&
        (!previousSibling?.checked || previousSibling.getAttribute('date-id'))
      ) {
        e.target.checked = false;
      } else if (nextSibling?.checked && previousSibling?.checked) {
        e.target.checked = true;
      }

      return;
    }
  };

  const onCancel = () => {
    console.log('onCancel');
  };

  return (
    <div
      className={cn(
        styles.wrapper,
        'flex min-h-[800px] w-11/12 flex-col gap-8 overflow-x-hidden rounded-form bg-white p-10',
      )}
    >
      <div className="flex items-center">
        <button className="hover:opacity-75" key="back" onClick={onCancel}>
          <ArrowLeftOutlined className="mr-4 text-xl" />
        </button>
        <h4 className="cursor-pointer font-bold">
          Quản lý đặt chỗ - {nameSportField}
        </h4>
      </div>
      <div className={cn(styles.navigation, 'flex gap-10 self-end')}>
        <button className="" onClick={handlePrevWeek}>
          <LeftOutlined />
        </button>
        <button onClick={handleNextWeek}>
          <RightOutlined />
        </button>
      </div>
      <div className="relative">
        <div className="w-full overflow-auto">
          <ScheduleTable
            bookingResponse={bookingResponse}
            labelColumns={labelColumns}
            labelRows={labelRows}
            startDateSchedule={startDateSchedule}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TableSection;
