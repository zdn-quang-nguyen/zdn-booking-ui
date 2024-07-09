import Item from '@/components/common/Item';
import { groupBookingsByDay } from '@/utils/groupBookingsByDay';
import { useEffect, useState } from 'react';

interface TransactionProps {
  bookings: any;
}

const Transaction: React.FC<TransactionProps> = ({ bookings }) => {
  const [groupBookings, setGroupBookings] = useState<any>();

  useEffect(() => {
    setGroupBookings(groupBookingsByDay(bookings));
  }, [bookings]);
  return (
    <div className="flex flex-col gap-8">
      {groupBookings &&
        Object.entries(groupBookings).map(([date, bookings]) => (
          <div key={date} className="flex flex-col gap-5">
            <span className="body-2 font-bold text-natural-700">{date}</span>
            <div className="flex flex-col gap-3">
              {(bookings as any[]).map((booking: any, index: number) => (
                <Item key={index} data={booking} label="transaction" />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Transaction;
