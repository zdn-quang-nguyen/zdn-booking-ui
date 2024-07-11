//
import React from 'react';
import Link from 'next/link';
import {
  BOOKING_STATUS_MAPPING,
  CATEGORY_MAPPING,
  USER_BOOKING_STATUS_MAPPING,
} from '@/constants/constant';
// import { sportField } from '@/mocks/sport-fields';
import dayjs from 'dayjs';
import moment from 'moment';
import { addTimezone, formatCurrency, timeAgo } from '@/libs/utils';

interface ItemProps {
  data: any;
  label: string;
  onClick?: (value: any) => void;
}

const mockData = {
  title: '',
  status: 'booking',
  type: 'booking',
  url: '/test',
  description: '',
  data: {
    fullName: 'Nguyen Van A',
    phoneNumber: '0123456789',
    sportField: {
      name: 'Sân A',
      id: '123321',
      sportFieldType: 'Bong Da',
    },
    status: 'rejected',
    field: 'field3',
    start: '05:00',
    end: '10:00',
    price: 100000000000,
    updatedAt: Date.now(),
  },
};

const DotFrame: React.FC = () => {
  return <span className={`block h-1 w-1 rounded-lg bg-natural-300`}></span>;
};

const Item: React.FC<ItemProps> = ({ data, label, onClick }) => {
  const handleClick = () => {
    onClick && onClick(data);
  };

  const textColor = (status: string) => {
    if (label === 'user-booking') {
      switch (status) {
        case 'booking':
          return 'text-primary-600';
        case 'disabled':
          return 'text-primary-600';
        case 'rejected':
          return 'text-alerts-red';
        default:
          return '';
      }
    }

    switch (status) {
      case 'booking':
        return 'text-primary-600';
      case 'accepted':
        return 'text-primary-600';
      case 'disabled':
        return 'text-primary-600';
      case 'read':
        return 'text-natural-400';
      case 'rejected':
        return 'text-alerts-red';
      case 'success':
        return 'text-success-green';
      default:
        return '';
    }
  };
  return (
    <div className="flex w-full flex-row justify-between bg-white">
      <div className="flex flex-grow flex-col justify-start gap-1">
        <div>
          {(label === 'transaction' || label === 'booking') && (
            <div className={`flex flex-row items-center gap-2`}>
              <Link href="#" className={`body-4 text-natural-700} font-medium`}>
                {data.fullName}
              </Link>
            </div>
          )}
          {(label === 'notification' || label === 'user-booking') && (
            <div className={`flex flex-row items-center gap-2`}>
              <span
                // href="#"
                className={`body-4 font-bold ${textColor(data.status)}`}
              >
                {label === 'notification' && mockData.title}
                {label === 'user-booking' &&
                  USER_BOOKING_STATUS_MAPPING[data?.status]}
              </span>
              <DotFrame />
              <span className={`body-5 text-primary-600`}>
                {timeAgo(addTimezone(new Date(data.createdAt)))}
              </span>
            </div>
          )}
        </div>
        <div>
          {label === 'notification' ? (
            <p className={`body-5 text-neutral-400`}>{mockData.description}</p>
          ) : (
            <div
              className={`body-5 flex flex-row items-center gap-2 text-natural-500`}
            >
              {label === 'user-booking' ? (
                <p>{data?.field?.sportField?.name}</p>
              ) : (
                <p>
                  {
                    CATEGORY_MAPPING[
                      data?.field?.sportField?.sportFieldType?.name
                    ]
                  }
                </p>
              )}
              <DotFrame />
              <p>
                {moment(data.startTime).local().format('HH:mm')}-{' '}
                {moment(data.endTime).local().format('HH:mm')}
              </p>
              <DotFrame />
              <p>{data?.field?.name}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {(label == 'transaction' || label == 'booking') && (
          <div className="flex flex-col gap-1">
            <span className="body-4 flex flex-row justify-end font-medium text-natural-700">
              {formatCurrency(data.amount)}
            </span>
            {label == 'transaction' && (
              <span
                className={`body-4 font-bold ${textColor(data.status)} text-right`}
              >
                {BOOKING_STATUS_MAPPING[data.status]}
              </span>
            )}
            {label == 'booking' && (
              <button
                onClick={handleClick}
                className={`body-4 text-right font-bold text-accent-600 underline`}
              >
                {'Duyệt đặt chỗ'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;
