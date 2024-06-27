import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import styles from './ScheduleTable.module.scss';
import React, { useEffect, useState } from 'react';
import { cn } from '@/libs/utils';
import { Button, message } from 'antd';
import QRBooking from './QRBooking';
import { FieldResponse } from '../page';
import { getBookingById, removeBookingById } from '../api/booking';
import { BookingData } from './ScheduleTable';
import { useRouter } from 'next/navigation';

type ReservationBookingProps = {
  isDeleteForm: boolean;
  isOpen: boolean;
  isClose: () => void;
  bookingId: string;
  field: FieldResponse;
  bookingTime?: any;
  bookings: BookingData[];
};
type Booking = {
  id: string;
  createdAt: string;
  updatedAt: string;

  createdBy: string;
  updatedBy: string;

  phone: string;
  fullName: string;
  fieldId: string;
  startTime: string;
  endTime: string;
  amount: number;
};

export default function ReservationBooking({
  isDeleteForm,
  isOpen,
  isClose,
  bookingId,
  field,
  bookingTime,
  bookings,
}: ReservationBookingProps) {
  console.log({ bookingId, field, isDeleteForm });
  // const [booking, setBooking] = useState<Booking>(); // [1
  // const fetchBooking = async () => {
  //   const res = await getBookingById(bookingId);
  //   if (res) {
  //     console.log(123, res.data);
  //     setBooking(res.data);
  //   }
  // };
  const route = useRouter();
  const handleDeleteBooking = async () => {
    const res = await removeBookingById(bookingId);
    if (res) {
      message.error('Xóa thành công');
      isClose();
      route.push(`/table-booking?fieldId=${field.id}`);
    }
  };
  // useEffect(() => {
  //   if (bookingId !== '') {
  //     fetchBooking();
  //   }
  // }, [bookingId]);
  let booking = bookings.find((item) => item.id === bookingId);
  return (
    <div
      className={cn(
        styles.modal,
        `${isOpen ? 'absolute flex' : 'hidden'} z-1 right-0 top-0 h-full w-full items-center justify-center rounded-[20px] transition`,
      )}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="flex flex-wrap">
        <div
          className={`z-10 max-w-[534px] rounded-l-[20px] ${isDeleteForm ? 'rounded-r-[20px]' : ''} bg-white px-10 py-6 md:w-[534px]`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold leading-5 text-natural-700">
              Đặt chỗ
            </span>
            {isDeleteForm ? (
              <CloseOutlined
                onClick={() => isClose()}
                className="cursor-pointer text-xl text-natural-700"
              />
            ) : (
              ' '
            )}
          </div>
          <div className="mt-6 flex flex-col gap-y-6">
            <div>
              <p className="mb-2 text-sm font-medium leading-5 text-neutral-700">
                Địa điểm
              </p>
              <div className="space-y-1">
                <p className="text-sm font-bold leading-5 text-neutral-500">
                  {field.sportField?.name ?? 'Chưa cập nhật'}
                </p>
                <p className="text-xs font-normal leading-4 text-neutral-700">
                  {field.sportField?.location?.addressDetail ?? 'Chưa cập nhật'}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium leading-5 text-neutral-700">
                Thời gian
              </p>
              <div className="flex flex-wrap gap-x-5 text-sm font-bold text-natural-700">
                <p>
                  {new Date(booking?.startTime as string).toLocaleTimeString()}{' '}
                  - {new Date(booking?.endTime as string).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap text-sm font-medium leading-5 text-neutral-700">
              <div className="mr-8">
                <span>Sân</span>
                <p className="mt-2 text-sm font-bold leading-5">{field.name}</p>
              </div>
              <div>
                <span>Ngày</span>
                <p className="mt-2 text-sm font-bold leading-5">
                  {new Date(booking?.startTime as string).toLocaleDateString(
                    'en-US',
                    { year: 'numeric', month: '2-digit', day: '2-digit' },
                  )}
                </p>
              </div>
            </div>

            <div>
              <p className="na text-sm font-medium leading-5 text-natural-700">
                Tên
              </p>
              <input
                type="text"
                value={booking?.fullName}
                className="mt-2 w-full rounded-large border border-neutral-200 px-4 py-[10px] focus:outline-primary-400"
              />
            </div>
            <div>
              <p className="na text-sm font-medium leading-5 text-natural-700">
                Số điện thoại
              </p>
              <input
                type="text"
                value={booking?.phone}
                className="mt-2 w-full rounded-large border border-neutral-200 px-4 py-[10px] focus:outline-primary-400"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-between">
            <div>
              <span className="flex cursor-pointer text-sm font-bold leading-5 text-accent-600">
                <EditOutlined className="mr-3" />
                Note
              </span>
              <div className="mt-3 flex text-sm font-medium leading-5">
                Tổng tiền{' '}
                <p className="ml-3 text-base font-bold text-primary-600">
                  {booking?.amount}
                </p>
              </div>
            </div>
            <div className="submit">
              <Button
                onClick={handleDeleteBooking}
                type="primary"
                {...(isDeleteForm ? { danger: true } : {})}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
        <QRBooking isClose={isDeleteForm}/>
      </div>
    </div>
  );
}
