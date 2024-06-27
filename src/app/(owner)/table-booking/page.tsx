import type { Metadata } from 'next';
import ScheduleTable from './components/ScheduleTable';
import { redirect } from 'next/navigation';
import { getBookingsByFieldId } from './api/booking';
import { getFieldById } from './api/field';

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
type OwnerHomePageProps = {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
};

export type FieldResponse = {
  sportField: SportField;
} & Field;

const OwnerHomePage = async ({ searchParams }: OwnerHomePageProps) => {
  const fieldId = searchParams?.fieldId;
  const startDate = new Date(searchParams?.startDate as string);
  const endDate = new Date(searchParams?.endDate as string);

  if (!fieldId) {
    redirect('/home');
  }

  const field: FieldResponse = await getFieldById(fieldId);
  console.log(field);

  if (!field) {
    redirect('/home');
  }

  const [startHour, startMinute] =
    field.sportField?.startTime?.split(':') ?? [];
  const [endHour, endMinute] = field.sportField?.endTime?.split(':') ?? [];

  if (!startHour || !startMinute || !endHour || !endMinute) {
    redirect('/home');
  }

  startDate.setHours(Number(startHour), Number(startMinute));
  endDate.setHours(Number(endHour), Number(endMinute));

  const fieldData: FieldData = {
    name: field.name,
    startTime: field.sportField.startTime,
    endTime: field.sportField.endTime,
  };

  const bookings = await getBookingsByFieldId(fieldId, startDate, endDate);

  return (
    <div className="flex h-full w-full items-end justify-center">
      <ScheduleTable fieldData={fieldData} bookings={bookings} field={field} />
    </div>
  );
};
export default OwnerHomePage;
