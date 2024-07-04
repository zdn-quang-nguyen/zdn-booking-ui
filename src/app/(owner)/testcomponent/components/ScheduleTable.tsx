import { parseDateFromString, parseTimeToMinutes } from '@/libs/utils';
import React from 'react';
import { CheckStatus } from './TableSection';
import styles from './ScheduleTable.module.scss';
import { Tooltip } from 'antd';

interface ScheduleTableProps {
  bookingResponse: BookingResponse[];
  labelColumns: {
    label: string;
    start: number;
    end: number;
  }[];
  labelRows: string[];
  startDateSchedule: Date;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScheduleTable = (props: ScheduleTableProps) => {
  const {
    bookingResponse,
    labelColumns,
    labelRows,
    startDateSchedule,
    handleCheckboxChange,
  } = props;

  function isTimeSlotBooked(
    columnStart: number,
    columnEnd: number,
    date: string,
  ) {
    const matchedBooking = bookingResponse.find((booking) => {
      console.log('abccc', booking);
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
      const bookingDate = new Date(booking.startTime);

      if (
        inputDate &&
        new Date(inputDate).toLocaleDateString() ===
          new Date(bookingDate).toLocaleDateString()
      ) {
        if (columnStart >= bookingStart && columnEnd <= bookingEnd)
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
    if (startDateSchedule.getFullYear() < inputDate.getFullYear()) {
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

  return (
    <div>
      <table className="overflow-x-scroll">
        <thead>
          <tr className="min-h-10">
            <th className="absolute min-h-10 min-w-24"></th>
            <th
              className="min-w-24"
              style={{
                border: 'none',
              }}
            ></th>
            {labelColumns.map((labelColumn) => (
              <th
                className="body-3 min-w-48 font-medium"
                key={labelColumn.label}
              >
                {labelColumn.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {labelRows.map((labelRow) => (
            <tr key={labelRow}>
              <td className="body-3 absolute w-24 truncate bg-white font-medium">
                {labelRow}
              </td>
              <td
                className="min-w-24 border-none"
                style={{
                  border: 'none',
                }}
              ></td>
              {labelColumns.map((labelColumn) => {
                const booking = isTimeSlotBooked(
                  labelColumn.start,
                  labelColumn.end,
                  labelRow,
                );
                return (
                  <td
                    key={labelColumn.label + startDateSchedule.toDateString()}
                    className={
                      isPastSlot(labelRow, labelColumn.label.split('-')[1])
                        ? styles.pastSlot
                        : status === CheckStatus.UNCHECKED_BOOKING && booking
                          ? styles.checkedBooking
                          : status === CheckStatus.CHECKED_BOOKING && !booking
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
                            <div>{booking.phone}</div>
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
                        data-date={labelRow}
                        data-time={labelColumn.label}
                        type="checkbox"
                        defaultChecked={!!booking}
                        onChange={(e) => handleCheckboxChange(e)}
                        disabled={
                          isPastSlot(
                            labelRow,
                            labelColumn.label.split('-')[1],
                          ) ||
                          (status === CheckStatus.UNCHECKED_BOOKING &&
                            !!booking) ||
                          (status === CheckStatus.CHECKED_BOOKING && !booking)
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
  );
};

export default ScheduleTable;
