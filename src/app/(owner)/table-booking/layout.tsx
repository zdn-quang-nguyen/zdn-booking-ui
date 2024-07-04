import type { Metadata } from 'next';

type TableBookingProps = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Zodinet Booking - Table Booking Page',
  description:
    'Zodinet Booking - Table Booking: Manage Your Table Bookings with Ease',
};

export default function TableBookingLayout({ children }: TableBookingProps) {
  return <>{children}</>;
}
