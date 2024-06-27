'use client';

import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { Button, Form, Select } from 'antd';
import { BOOKING_STATUS, BOOKING_STATUS_MAPPING } from '@/constants/constant';
import styles from './page.module.scss';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import DatePickerComponent from '@/components/common/DatePickerComponent';
import { Input } from 'antd';
import { CaretDownFilled, FilterFilled } from '@ant-design/icons';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import OwnerBooking from './components/Booking';

const { Search } = Input;

function Page() {
  const [status, setStatus] = useState<string>(BOOKING_STATUS[0]);
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [time, setTime] = useState<[Dayjs, Dayjs]>();
  const [input, setInput] = useState<string>('');
  const onFilter = () => {
    console.log('input', input);
    console.log('status', status);
    if (date) {
      console.log('date', date.format('DD/MM/YYYY'));
    } else console.log('date', date);
    if (time) {
      console.log('time', time[0].format('HH:mm'), time[1].format('HH:mm'));
      console.log('time', time);
    } else console.log('time', time);
  };

  return (
    <div
      className={`m-auto flex h-full flex-grow flex-col gap-8 bg-white p-10 sm:w-full md:w-4/5 lg:w-3/4 xl:w-2/3 ${styles.page}`}
    >
      <div className="flex flex-col gap-5">
        <h4 className="font-bold text-natural-700">Đặt Chỗ</h4>
      </div>
      <OwnerBooking />
    </div>
  );
}

export default Page;
