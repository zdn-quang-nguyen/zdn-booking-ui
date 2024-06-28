import React from 'react';
import qr1 from '../../../../../public/images/QRReservation.png';
import Image from 'next/image';
import { CloseOutlined } from '@ant-design/icons';
import dowload from '../../../../../public/icons/dowload.svg';
export default function QRBooking({
  isClose,
  onClose: handleClose,
}: {
  isClose: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      className={`${isClose ? 'hidden' : 'block'} z-10 rounded-r-[20px] bg-primary-100 px-[60px] py-8`}
    >
      <div className="flex w-full justify-end">
        <CloseOutlined
          className="cursor-pointer justify-end text-xl text-natural-700"
          onClick={handleClose}
        />
      </div>
      <div className="mt-14 flex flex-col items-center text-natural-700">
        <span className="text-base font-bold">Nhận mã QR để vào cổng</span>
        <p className="mb-5 mt-1 text-sm font-normal">
          Mã QR chỉ có thể sử dụng 1 lần duy nhất
        </p>
        <Image src={qr1} alt="qr" width={280} height={280} />
        <p className="mt-4 flex items-center text-sm font-bold text-primary-600">
          Lưu mã QR{' '}
          <Image
            src={dowload}
            alt="dowloadQr"
            className="ml-2"
            width={15}
            height={15}
          />
        </p>
      </div>
    </div>
  );
}
