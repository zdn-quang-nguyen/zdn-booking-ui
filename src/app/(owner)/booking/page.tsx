'use client';

import styles from './page.module.scss';
import OwnerBooking from './components/Booking';
import { getOwnerBookings } from '../apis/booking.api';
import page from '@/app/role/page';
import { useEffect, useState } from 'react';
import Pagination from '@/components/pagination/Pagination';

async function Page() {
  const [bookings, setBookings] = useState<any[]>([]); // Add state for bookings
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const onPageChange = async (newPage: number) => {
    setBookings(await getOwnerBookings()); // Update bookings when page changes
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const fetchedBookings = await getOwnerBookings();
      setBookings(fetchedBookings.data);
      setIsLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <div
      className={`m-auto flex h-full flex-grow flex-col gap-8 bg-white p-10 sm:w-full md:w-4/5 lg:w-3/4 xl:w-2/3 ${styles.page}`}
    >
      <div className="flex flex-col gap-5">
        {isLoading ? (
          <h4 className="font-bold text-natural-700">Loading...</h4>
        ) : (
          <h4 className="font-bold text-natural-700">Đặt Chỗ</h4>
        )}
      </div>
      <OwnerBooking bookings={bookings} />
      <div className="flex items-center justify-center">
        <Pagination
          currentPage={1}
          totalPages={5}
          onPageChange={(value) => console.log(value)}
        />
      </div>
    </div>
  );
}

export default Page;
