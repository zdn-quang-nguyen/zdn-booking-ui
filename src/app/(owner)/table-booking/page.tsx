import type { Metadata } from 'next';
import ScheduleTable from './components/ScheduleTable';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Owner Home Page',
  description:
    'Zodinet Booking - Owner Home: Manage Your Sport Fields with Ease',
};

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

const dummyData: FieldData = {
  name: 'Field 1',
  startTime: '13:00:00',
  endTime: '16:00:00',
};

const dummyBookings: BookingData[] = [
  {
    id: '1',
    phone: '1234567890  ',
    fullName: 'Alice Smith',
    fieldId: '123e4567-e89b-12d3-a456-426614174000',
    startTime: '2024-06-27T15:00:00Z',
    endTime: '2024-06-27T15:30:00Z',
    amount: 150.0,
    status: 'booking',
  },
  {
    id: '2',
    phone: '0987654321',
    fullName: 'Bob Johnson',
    fieldId: '123e4567-e89b-12d3-a456-426614174000',
    startTime: '2024-06-28T13:30:00Z',
    endTime: '2024-06-28T15:00:00Z',
    amount: 150.0,
    status: 'booking',
  },
  {
    id: '3',
    phone: '0987654321',
    fullName: 'Bob Johnson',
    fieldId: '123e4567-e89b-12d3-a456-426614174000',
    startTime: '2024-06-30T15:00:00Z',
    endTime: '2024-06-30T15:30:00Z',
    amount: 150.0,
    status: 'booking',
  },
];

const OwnerHomePage = () => {
  return (
    <div className="flex h-full w-full items-end justify-center">
      <ScheduleTable fieldData={dummyData} bookings={dummyBookings} />
    </div>
  );
};
export default OwnerHomePage;
