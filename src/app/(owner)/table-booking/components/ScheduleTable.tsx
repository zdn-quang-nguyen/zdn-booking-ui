'use client';
import { Button, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './ScheduleTable.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { cn } from '@/libs/utils';
import ReservationBooking from './ReservationBooking';
import { FieldResponse } from '../page';

export interface BookingData {
  id: string;
  phone: string;
  fullName: string;
  fieldId: string;
  startTime: string;
  endTime: string;
  amount: number;
  status: string;
}

export interface FieldData {
  name: string;
  startTime: string;
  endTime: string;
}

function parseTimeToMinutes(timeStr: string) {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 60 + minutes + (seconds || 0) / 60;
}

function generateColumns(startTime: string, endTime: string) {
  const startMinutes = parseTimeToMinutes(startTime);
  const endMinutes = parseTimeToMinutes(endTime);
  const totalMinutes = endMinutes - startMinutes;

  return Array.from({ length: Math.floor(totalMinutes / 30) }, (_, i) => {
    const minutes = startMinutes + 30 * i;
    const endMinutes = minutes + 30;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    return {
      label: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')} - ${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`,
      start: minutes,
      end: endMinutes,
    };
  });
}

function getCurrentWeekDates(now: Date) {
  const monday = new Date(
    now.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1)),
  );
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(new Date(monday).setDate(monday.getDate() + i));
    const weekdayShort = day
      .toLocaleDateString('vi', { weekday: 'short' })
      .replace('.', '');
    const formattedWeekday = weekdayShort.replace('Th ', 'T'); // Remove space after 'Th'
    return `${formattedWeekday} - ${day.getDate()}/${day.getMonth() + 1}`;
  });
}

function parseDateFromString(dateStr: string) {
  if (!dateStr) {
    return null;
  }
  // Split the input string into components
  const parts = dateStr.split(' - '); // E.g., ['T2', '30/6']
  if (parts.length !== 2) {
    throw new Error('Invalid date format');
  }

  // Extract the day and month
  const [day, month] = parts[1].split('/').map(Number); // Convert day and month to numbers

  // Get the current year to use it in the date object
  const year = new Date().getFullYear();

  // Create a new Date object in UTC
  const date = new Date(Date.UTC(year, month - 1, day));

  // Ensure the created date matches the input day and month (handles edge cases around month changes)
  if (date.getUTCDate() !== day || date.getUTCMonth() + 1 !== month) {
    throw new Error('Invalid day or month in date string');
  }

  return date;
}

interface ScheduleTableProps {
  fieldData: FieldData;
  bookings: BookingData[];
  field: FieldResponse;
}

enum CheckStatus {
  CHECKED_BOOKING = 'checked_booking',
  UNCHECKED_BOOKING = 'unchecked_booking',
  DEFAULT = 'default',
}
const ScheduleTable: React.FC<ScheduleTableProps> = ({
  fieldData,
  bookings,
  field,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const columns = generateColumns(fieldData.startTime, fieldData.endTime);
  const [startWeek, setStartWeek] = React.useState(new Date());
  const weekDates = getCurrentWeekDates(startWeek);
  const [checkedBookings, setCheckedBookings] = useState<string[]>([]);
  const [uncheckedBookings, setUncheckedBookings] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState('');

  const [status, setStatus] = useState<CheckStatus>(CheckStatus.DEFAULT);

  const handleNextWeek = () => {
    setStartWeek(new Date(startWeek.setDate(startWeek.getDate() + 7)));
  };

  const handlePrevWeek = () => {
    setStartWeek(new Date(startWeek.setDate(startWeek.getDate() - 7)));
  };

  useEffect(() => {
    const startDateIndex = 0;
    const endDateIndex = 6;

    const startDate = parseDateFromString(weekDates[startDateIndex]);
    const endDate = parseDateFromString(weekDates[endDateIndex]);
    const params = new URLSearchParams(searchParams);
    startDate && params.set('startDate', new Date(startDate).toISOString());
    endDate && params.set('endDate', new Date(endDate).toISOString());

    router.push(`${pathname}?${params.toString()}`);
  }, [weekDates]);

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

      if (!nextSibling?.checked && !previousSibling?.checked) {
        e.target.checked = false;
      }

      return;
    }
    if (id) {
      setStatus(CheckStatus.CHECKED_BOOKING);
      setCurrentBookingId(id);
      checkboxes.forEach((el: Element) => {
        if (el.getAttribute('data-id') === id) {
          if (el !== e.target) {
            (el as HTMLInputElement).checked = e.target.checked;
          }
        }
      });
      setUncheckedBookings(!e.target.checked ? id : '');
      // if (uncheckedBookings)
      checkboxes.forEach((el: Element) => {
        if (
          el.getAttribute('data-id') !== id &&
          status !== CheckStatus.DEFAULT
        ) {
          (el as HTMLInputElement).checked = !!el.getAttribute('data-id');
        }
      });
    } else {
      setStatus(CheckStatus.UNCHECKED_BOOKING);
    }
  };

  // clear all state
  const handleReset = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((el: Element) => {
      if (!el.getAttribute('data-id')) {
        (el as HTMLInputElement).checked = false;
      } else {
        (el as HTMLInputElement).checked = true;
      }

      // (el as HTMLInputElement).checked = false;
    });
    setStatus(CheckStatus.DEFAULT);
    setUncheckedBookings('');
  };

  const handleSubmit = () => {
    setIsOpen(true);
  };

  function isTimeSlotBooked(
    columnStart: number,
    columnEnd: number,
    date: string,
  ) {
    const matchedBooking = bookings.find((booking) => {
      const bookingStart = parseTimeToMinutes(
        new Date(booking.startTime).toLocaleTimeString('en-US', {
          hourCycle: 'h24',
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
      const bookingEnd = parseTimeToMinutes(
        new Date(booking.endTime).toLocaleTimeString('en-US', {
          hourCycle: 'h24',
          hour: '2-digit',
          minute: '2-digit',
        }),
      );
      const inputDate = parseDateFromString(date);
      const bookingDate = new Date(booking.startTime.split('T')[0]);

      if (
        inputDate &&
        inputDate.toISOString().slice(0, 10) ===
          bookingDate.toISOString().slice(0, 10)
      ) {
        return columnStart >= bookingStart && columnEnd <= bookingEnd;
      }
      return false;
    });

    return matchedBooking;
  }

  const isPastSlot = (date: string, time: string) => {
    const inputDate = parseDateFromString(date);
    if (!inputDate) {
      return true;
    }

    const currentDate = new Date();
    currentDate.setHours(7, 0, 0, 0);
    const currentTime = new Date();
    const inputTime = new Date();
    inputTime.setHours(Number(time.split(':')[0]), Number(time.split(':')[1]));

    // return inputDate < currentDate && inputTime < currentTime;
    if (startWeek.getFullYear() < inputDate.getFullYear()) {
      return true;
    }
    if (inputDate.getTime() < currentDate.getTime()) {
      return true;
    } else if (inputDate.getTime() === currentDate.getTime()) {
      if (inputTime < currentTime) {
        return true;
      }
    }
    return false;
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <div
      className={cn(
        styles.wrapper,
        'flex w-11/12 flex-col gap-8 overflow-x-hidden rounded-form bg-white p-10',
      )}
    >
      <ReservationBooking
        isOpen={isOpen}
        isClose={() => setIsOpen(false)}
        isDeleteForm={status === CheckStatus.CHECKED_BOOKING}
        bookingId={currentBookingId}
        field={field}
        bookings={bookings}
      />
      <div className="flex items-center">
        <button className="hover:opacity-75" key="back" onClick={onCancel}>
          <ArrowLeftOutlined className="mr-4 text-xl" />
        </button>

        <h4 className="cursor-pointer font-bold">
          Quản lý đặt chỗ - {fieldData.name}
        </h4>
      </div>
      <div className={cn(styles.navigation, 'self-end')}>
        <button className="w-28" onClick={handlePrevWeek}>
          <LeftOutlined />
        </button>
        <button onClick={handleNextWeek}>
          <RightOutlined />
        </button>
        {/* <p>{startWeek.toDateString()}</p> */}
      </div>
      <div className="relative">
        <div className="w-full overflow-auto">
          <table className="overflow-x-scroll">
            <thead>
              <tr className="min-h-10">
                <th className="absolute min-h-10 min-w-24"></th>
                <th className="min-w-24" style={{ border: 'none' }}></th>
                {columns.map((column, index) => (
                  <th className="body-3 min-w-48 font-medium" key={index}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weekDates.map((date) => (
                <tr key={date}>
                  <td className="body-3 absolute w-24 truncate bg-white font-medium">
                    {date}
                  </td>
                  <td
                    className="min-w-24 border-none"
                    style={{ border: 'none' }}
                  ></td>
                  {columns.map((column) => {
                    const booking = isTimeSlotBooked(
                      column.start,
                      column.end,
                      date,
                    );
                    return (
                      <td
                        key={column.label + startWeek.toDateString()}
                        className={
                          isPastSlot(date, column.label.split('-')[1])
                            ? styles.pastSlot
                            : status === CheckStatus.UNCHECKED_BOOKING &&
                                booking
                              ? styles.checkedBooking
                              : status === CheckStatus.CHECKED_BOOKING &&
                                  !booking
                                ? styles.uncheckedBooking
                                : ''
                        }
                      >
                        <Tooltip
                          title={
                            booking ? (
                              <>
                                <div className="font-bold">Name:</div>
                                <div>{booking.fullName}</div>
                                <div className="font-bold">Phone:</div>
                                <div>{booking.phone.trim()}</div>
                                <div className="font-bold">Start:</div>
                                <div>
                                  {new Date(booking.startTime).toLocaleString()}
                                </div>
                                <div className="font-bold">End:</div>
                                <div>
                                  {new Date(booking.endTime).toLocaleString()}
                                </div>
                              </>
                            ) : (
                              ''
                            )
                          }
                          color={'green'}
                          key={'green'}
                        >
                          <input
                            data-id={booking?.id}
                            type="checkbox"
                            defaultChecked={!!booking}
                            onChange={(e) => handleCheckboxChange(e)}
                            disabled={
                              isPastSlot(date, column.label.split('-')[1]) ||
                              (status === CheckStatus.UNCHECKED_BOOKING &&
                                !!booking) ||
                              (status === CheckStatus.CHECKED_BOOKING &&
                                !booking)
                            }
                          />
                        </Tooltip>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex gap-20 self-end">
        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
          {status === CheckStatus.UNCHECKED_BOOKING
            ? 'Đặt sân'
            : status === CheckStatus.CHECKED_BOOKING
              ? 'Hủy'
              : 'Xác nhận'}
        </Button>
        {status !== CheckStatus.DEFAULT && (
          <Button type="primary" htmlType="reset" onClick={handleReset}>
            Đặt lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default ScheduleTable;
