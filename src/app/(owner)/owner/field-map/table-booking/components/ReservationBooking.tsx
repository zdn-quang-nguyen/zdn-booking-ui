import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import styles from './ScheduleTable.module.scss';
import React, { useEffect, useId, useState } from 'react';
import { cn } from '@/libs/utils';
import { Button, message } from 'antd';
import QRBooking from './QRBooking';
import {
  createBookingByOwner,
  CreateBookingByOwnerDto,
  getBookingById,
  removeBookingById,
} from '../api/booking';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import dayjs, { Dayjs } from 'dayjs';

type ReservationBookingProps = {
  isDeleteForm: boolean;
  isOpen: boolean;
  onClose: () => void;
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
type CreateBookingDto = {
  fullName: string;
  phone: string;
};

export default function ReservationBooking({
  isDeleteForm,
  isOpen,
  onClose,
  bookingId,
  field,
  bookingTime,
  bookings,
}: ReservationBookingProps) {
  const [time, setTime] = useState<[Dayjs, Dayjs]>([
    dayjs(bookingTime?.startTime),
    dayjs(bookingTime?.endTime),
  ]);
  console.log({ bookings });
  const [amount, setAmount] = useState(field.sportField.price ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const id = useId();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const handleDeleteBooking = async () => {
    try {
      setIsLoading(true);
      const res = await removeBookingById(bookingId);
      if (res) {
        message.error('Xóa thành công');
        mutate(
          (key) => typeof key === 'string' && key.startsWith('/booking/user?'),
        );
        onClose();
        route.push(`table-booking?fieldId=${field.id}&id=${id}` as any);
      }
    } catch (error) {
      message.error('Xóa thất bại');
    } finally {
      setIsLoading(false);
    }
  };
  const handleAddBooking = async () => {
    try {
      setIsLoading(true);
      if (!time) {
        message.error('Vui lòng chọn thời gian');
        return;
      }
      const startTime = new Date(bookingTime.startTime);
      startTime.setHours(time[0].hour(), time[0].minute());
      const endTime = new Date(bookingTime.startTime);
      endTime.setHours(time[1].hour(), time[1].minute());
      const data: CreateBookingByOwnerDto = {
        name: fullName,
        amount,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        fieldId: field.id as string,
        status: 'accepted',
        phone,
      };

      console.log(data);
      const res = await createBookingByOwner(data);
      if (res) {
        message.success('Thêm thành công');
        onClose();
        mutate(
          (key) => typeof key === 'string' && key.startsWith('/booking/user?'),
        );
        route.push(`table-booking?fieldId=${field.id}&id=${id}` as any);
      }
    } catch (error) {
      message.error('Tạo thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const calAmount = (startTime: Dayjs, endTime: Dayjs) => {
    const start = startTime.unix();
    const end = endTime.unix();
    const SLOT_SECOND = 30 * 60;
    const amount = ((end - start) / SLOT_SECOND) * field.sportField.price;
    setAmount(amount);
  };

  const handleDateChange = ([startTime, endTime]: [Dayjs, Dayjs]) => {
    calAmount(startTime, endTime);
    setTime([startTime, endTime]);
  };
  const handleSubmit = async () => {
    if (isDeleteForm) {
      await handleDeleteBooking();
    } else {
      await handleAddBooking();
    }
  };

  let booking = bookings.find((item) => item.id === bookingId);
  console.log(time);
  return (
    <div
      className={cn(
        styles.modal,
        `${isOpen ? 'absolute flex' : 'hidden'} right-0 top-0 z-[999] h-full w-full items-center justify-center rounded-[20px] transition`,
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
                onClick={onClose}
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
                <RangePickerComponent
                  value={[time[0].format('HH:mm'), time[1].format('HH:mm')]}
                  disabled={isDeleteForm}
                  onChange={handleDateChange}
                  defaultValue={[
                    dayjs(
                      isDeleteForm
                        ? booking?.startTime
                        : bookingTime?.startTime,
                    ).format('HH:mm'),
                    dayjs(
                      isDeleteForm ? booking?.endTime : bookingTime?.endTime,
                    ).format('HH:mm'),
                  ]}
                />
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
                  {new Date(
                    isDeleteForm
                      ? (booking?.startTime as string)
                      : (bookingTime?.startTime as string),
                  ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div>
              <p className="na text-sm font-medium leading-5 text-natural-700">
                Tên
              </p>
              <input
                type="text"
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
                name="fullName"
                value={isDeleteForm ? booking?.fullName : fullName}
                className="mt-2 w-full rounded-large border border-neutral-200 px-4 py-[10px] focus:outline-primary-400"
              />
            </div>
            <div>
              <p className="na text-sm font-medium leading-5 text-natural-700">
                Số điện thoại
              </p>
              <input
                type="text"
                disabled={isLoading}
                value={isDeleteForm ? booking?.phone : phone}
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
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
                  {isDeleteForm ? booking?.amount : amount}
                </p>
              </div>
            </div>
            <div className="submit">
              <Button
                onClick={handleSubmit}
                loading={isLoading}
                type="primary"
                {...(isDeleteForm ? { danger: true } : {})}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
        <QRBooking isOpacity isClose={isDeleteForm} onClose={onClose} />
      </div>
    </div>
  );
}
