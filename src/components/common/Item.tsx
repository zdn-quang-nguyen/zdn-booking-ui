//
import React from 'react';
import Link from 'next/link';
// import { sportField } from '@/mocks/sport-fields';

interface ItemProps {
  data: any;
  label: string;
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

const Item: React.FC<ItemProps> = (props) => {
  const { data, label } = props;
  const textColor = (status: string) => {
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
          {(label == 'transaction' || label == 'booking') && (
            <div className={`flex flex-row items-center gap-2`}>
              <Link
                href={mockData.url}
                className={`body-4 text-natural-700} font-medium`}
              >
                {mockData.data.fullName}
              </Link>
            </div>
          )}
          {label == 'notification' && (
            <div className={`flex flex-row items-center gap-2`}>
              <Link
                href={mockData.url}
                className={`body-4 font-bold ${textColor(mockData.status)}`}
              >
                {mockData.title}
              </Link>
              <DotFrame />
              <span className={`body-5 text-primary-600`}>2 giờ trước</span>
            </div>
          )}
        </div>
        <div>
          {label == 'notification' ? (
            <p className={`body-5 text-neutral-400`}>{mockData.description}</p>
          ) : (
            <div
              className={`body-5 flex flex-row items-center gap-2 text-natural-500`}
            >
              <p>{mockData.data.sportField.sportFieldType}</p>
              <DotFrame />
              <p>
                {mockData.data.start} - {mockData.data.end}
              </p>
              <DotFrame />
              <p>{mockData.data.field}</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        {(label == 'transaction' || label == 'booking') && (
          <div className="flex flex-col gap-1">
            <span className="body-4 flex flex-row justify-end font-medium text-natural-700">
              {mockData.data.price.toLocaleString('en').replaceAll(',', '.')}
              <p>đ</p>
            </span>
            {label == 'transaction' && (
              <span
                className={`body-4 font-bold ${textColor(mockData.data.status)} text-right`}
              >
                {'Đặt chỗ thành công'}
              </span>
            )}
            {label == 'booking' && (
              <button
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
