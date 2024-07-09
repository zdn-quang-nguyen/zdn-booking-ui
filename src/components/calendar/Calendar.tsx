'use client';
import React, { useEffect, useState } from 'react';
import RowCalendar from './RowCalendar';
import { getBookingEmptySportField } from '@/libs/api/sport-field-server.api';
import TimeRow from './TimeRow';
interface TimeData {
  startTime: string;
  endTime: string;
  isEmpty: boolean;
}
export default function Calendar({ sportField }: { sportField: SportField }) {
  const [timeSlots, setTimeSlots] = useState<TimeData[][]>([]);

  // Promise.all(
  //   times.map((time) => fetchBookingEmpty(time.startTime, time.endTime)),
  // ).then((results) => {
  //   setTimeSlots(results);
  // });

  return (
    <div className="relative h-card w-full overflow-x-hidden overflow-y-scroll rounded-large bg-accent-100 md:overflow-x-scroll">
      <div className="sticky top-0 w-full">
        <p className="left-6 pl-6 pt-6 text-lg font-bold">Lịch tuần này</p>
        <div className="top-0 ml-2 mt-7 flex items-center gap-4 px-6">
          <p className="pointer-events-none h-5 w-12 opacity-0">7:00</p>
          <div className="h-5 flex-1">
            <div className="h-5 w-6 text-center">T2</div>
          </div>
          <div className="h-5 flex-1">
            <div className="w-6 text-center">T3</div>
          </div>
          <div className="h-5 flex-1">
            <div className="w-6 text-center">T4</div>
          </div>
          <div className="h-5 flex-1">
            <div className="w-6 text-center">T5</div>
          </div>
          <div className="h-5 flex-1">
            <div className="w-6 text-center">T6</div>
          </div>
          <div className="h-5 flex-1">
            <div className="w-6 text-center">T7</div>
          </div>
          <div className="h-5 flex-1">
            <div className="w-6 text-center">CN</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-6">
        <div className="flex gap-4">
          <TimeRow
            startTime={'2024-06-24T21:00:00.000Z'}
            endTime={'2024-06-25T14:00:00.000Z'}
          />
          <div className="flex gap-4">
            <div className="flex gap-4">
              {timeSlots.map((slots, index) => (
                <RowCalendar key={index} timeSlots={slots} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
