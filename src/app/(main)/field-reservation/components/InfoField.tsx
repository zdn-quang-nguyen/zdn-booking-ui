'use client';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import type { DatePickerProps, SelectProps } from 'antd';
import { Button, Checkbox, DatePicker, Select } from 'antd';
import { cn } from '@/libs/utils';
import s from '@/app/(main)/field-reservation/infoField.module.scss';

export default function InfoField() {
  const [times, setTimes] = useState([
    {
      start: '',
      end: '',
    },
  ]);
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const options: SelectProps['options'] = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  function splitTimeRange(startTime, endTime) {
    const timeSlots = [];
    let [startHour, startMinute] = startTime.split(':').map(Number);
    let [endHour, endMinute] = endTime.split(':').map(Number);

    const formatTime = (hour, minute) => {
      const h = hour.toString().padStart(2, '0');
      const m = minute.toString().padStart(2, '0');
      return `${h}:${m}`;
    };

    while (
      startHour < endHour ||
      (startHour === endHour && startMinute < endMinute)
    ) {
      const currentTime = formatTime(startHour, startMinute);

      startMinute += 30;
      if (startMinute >= 60) {
        startMinute -= 60;
        startHour += 1;
      }

      const nextTime = formatTime(startHour, startMinute);
      if (
        startHour < endHour ||
        (startHour === endHour && startMinute <= endMinute)
      ) {
        timeSlots.push({
          start: currentTime,
          end: nextTime,
        });
      }
    }

    return timeSlots;
  }

  useEffect(() => {
    const time = splitTimeRange('9:00', '18:00');
    setTimes(time);
  }, []);

  return (
    <div>
      <div className="flex items-center">
        <p className="text-natural-400 font-medium text-sm mr-3 cursor-pointer">
          Trang chủ
        </p>
        <MdKeyboardArrowRight className="text-natural-400 w-4 h-4 mr-3" />
        <p className="text-primary-600 font-medium text-sm cursor-pointer">
          Đặt chỗ ngay
        </p>
      </div>

      <div className={cn(s.main)}>
        <div className="flex flex-wrap">
          <div className="flex flex-col mr-4">
            <span className="font-bold text-base text-natural-700 mb-3 ">
              Ngày
            </span>
            <DatePicker
              name="date-res"
              format={{
                format: 'DD/MM/YYYY',
                type: 'mask',
              }}
              onChange={onChange}
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-natural-700 mb-3">
              Sân
            </span>
            <Select options={options} />
          </div>
        </div>
        <div className="grid md:grid-cols-3  lg:grid-cols-6 sm:grid-cols-2 grid-cols-1 mt-8 gap-y-5 gap-x-18">
          {/* {Array.from({ length: 24 }).map(() => (
            <div className="flex items-center flex-wrap ">
              <span className="font-normal text-base text-natural-700 mr-9">
                5:00 - 5:30
              </span>
              <Checkbox value="A"></Checkbox>
            </div>
          ))} */}
          {times.map((slot, index) => (
            <div className="flex items-center flex-wrap " key={index}>
              <span className="font-normal text-base text-natural-700 mr-9">
                {slot.start}-{slot.end}
              </span>
              <Checkbox value={`Slot-${index}`} />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-8 flex-wrap">
          <div>
            <p className="text-base font-normal text-natural-700">
              Bạn đang chọn{' '}
              <span className="font-bold ml-2 ">5 tiếng/ngày</span>
            </p>
            <p className="text-base font-normal mt-3">
              Tổng tiền{' '}
              <span className="text-primary-600 font-bold ml-2 ">
                1.400.000đ
              </span>
            </p>
          </div>
          <div className="mt-2">
            <Button type="primary" className="mr-3">
              Đặt lại
            </Button>
            <Button>Xác nhận</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
