'use client';
import React from 'react';
import styles from './ScheduleTable.module.scss';
import { set } from 'zod';

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
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({
  fieldData,
  bookings,
}) => {
  const columns = generateColumns(fieldData.startTime, fieldData.endTime);

  const [startWeek, setStartWeek] = React.useState(new Date());

  const handleNextWeek = () => {
    setStartWeek(new Date(startWeek.setDate(startWeek.getDate() + 7)));
  };

  const handlePrevWeek = () => {
    setStartWeek(new Date(startWeek.setDate(startWeek.getDate() - 7)));
  };

  const weekDates = getCurrentWeekDates(startWeek);

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Handle the change, e.g., update state or props
  }

  // function isTimeSlotBooked(
  //   columnStart: number,
  //   columnEnd: number,
  //   date: string,
  // ) {
  //   return bookings.some((booking) => {
  //     const bookingStart = parseTimeToMinutes(booking.startTime.split('T')[1]);
  //     const bookingEnd = parseTimeToMinutes(booking.endTime.split('T')[1]);
  //     const inputDate = parseDateFromString(date);
  //     const bookingDate = new Date(booking.startTime.split('T')[0]);

  //     if (
  //       inputDate.toISOString().slice(0, 10) ===
  //       bookingDate.toISOString().slice(0, 10)
  //     ) {
  //       return (
  //         (columnStart > bookingStart || columnStart == bookingStart) &&
  //         (columnEnd < bookingEnd || columnEnd == bookingEnd)
  //       );
  //     }
  //     return false;
  //   });
  // }

  function isTimeSlotBooked(
    columnStart: number,
    columnEnd: number,
    date: string,
  ) {
    const matchedBooking = bookings.find((booking) => {
      const bookingStart = parseTimeToMinutes(booking.startTime.split('T')[1]);
      const bookingEnd = parseTimeToMinutes(booking.endTime.split('T')[1]);
      const inputDate = parseDateFromString(date);
      const bookingDate = new Date(booking.startTime.split('T')[0]);

      if (
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
    const currentDate = new Date();
    currentDate.setHours(7, 0, 0, 0);
    const currentTime = new Date();
    const inputTime = new Date();
    inputTime.setHours(Number(time.split(':')[0]), Number(time.split(':')[1]));

    // return inputDate < currentDate && inputTime < currentTime;
    if (inputDate.getTime() < currentDate.getTime()) {
      return true;
    } else if (inputDate.getTime() === currentDate.getTime()) {
      if (inputTime < currentTime) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.navigation}>
        <button className="w-28" onClick={handlePrevWeek}>
          -
        </button>
        <button onClick={handleNextWeek}>+</button>
        <p>{startWeek.toDateString()}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date/Time</th>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weekDates.map((date, dateIndex) => (
            <tr key={dateIndex}>
              <td>{date}</td>
              {columns.map((column, columnIndex) => {
                const booking = isTimeSlotBooked(
                  column.start,
                  column.end,
                  date,
                );
                return (
                  <td
                    key={columnIndex}
                    className={
                      isPastSlot(date, column.label.split('-')[1])
                        ? styles.pastSlot
                        : ''
                    }
                    title={
                      booking
                        ? `ID: ${booking.id}, Phone: ${booking.phone.trim()}, Name: ${booking.fullName}, Start: ${booking.startTime}, End: ${booking.endTime}`
                        : ''
                    }
                  >
                    <input
                      type="checkbox"
                      checked={!!booking}
                      onChange={handleCheckboxChange}
                      disabled={isPastSlot(date, column.label.split('-')[1])}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
