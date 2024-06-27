import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import styles from './ScheduleTable.module.scss';
import React from 'react';
import { cn } from '@/libs/utils';
import { Button } from 'antd';
import QRBooking from './QRBooking';
import { FieldResponse } from '../page';

type ReservationBookingProps = {
  isDeleteForm: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  bookingId?: string;
  field: FieldResponse;
};
export default function ReservationBooking({
  isDeleteForm,
  isOpen,
  setIsOpen,
  bookingId,
  field,
}: ReservationBookingProps) {
  console.log({ bookingId, field, isDeleteForm });
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
              <CloseOutlined className="cursor-pointer text-xl text-natural-700" />
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
                  Sân cầu lông Tada Bình Lợi
                </p>
                <p className="text-xs font-normal leading-4 text-neutral-700">
                  42 Kha Vạn Cân, Hiệp Bình Chánh, Thủ Đức, Tp. Hồ Chí Minh
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium leading-5 text-neutral-700">
                Thời gian
              </p>
              <div className="flex flex-wrap gap-x-5 text-sm font-bold text-natural-700">
                <p>9:00 - 11:30</p>
                <p>9:00 - 11:30</p>
                <p>9:00 - 11:30</p>
              </div>
            </div>
            <div className="flex flex-wrap text-sm font-medium leading-5 text-neutral-700">
              <div className="mr-8">
                <span>Sân</span>
                <p className="mt-2 text-sm font-bold leading-5">A1</p>
              </div>
              <div>
                <span>Ngày</span>
                <p className="mt-2 text-sm font-bold leading-5">
                  Hôm nay 19/5/2024
                </p>
              </div>
            </div>

            <div>
              <p className="na text-sm font-medium leading-5 text-natural-700">
                Tên
              </p>
              <input
                type="text"
                className="mt-2 w-full rounded-large border border-neutral-200 px-4 py-[10px] focus:outline-primary-400"
              />
            </div>
            <div>
              <p className="na text-sm font-medium leading-5 text-natural-700">
                Số điện thoại
              </p>
              <input
                type="text"
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
                  280.000đ
                </p>
              </div>
            </div>
            <div className="submit">
              <Button
                type="primary"
                {...(isDeleteForm ? { danger: true } : {})}
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
        <QRBooking isClose={isDeleteForm} />
      </div>
    </div>
  );
}
