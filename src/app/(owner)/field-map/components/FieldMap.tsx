'use client';
import React from 'react';
import { Button } from 'antd';
import { FaArrowLeft } from 'react-icons/fa6';
import { cn } from '@/libs/utils';
import styles from './fieldMap.module.scss';

const FieldMap = () => {
  const fieldNames = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
  ];

  const handleButtonClick = (index: number) => {
    console.log(`Đã chọn sân ${fieldNames[index]}`);
  };

  return (
    <div
      className={cn(
        styles.fieldMapContainer,
        'rounded-large-sm mx-auto mt-12 flex h-fit w-fit flex-col gap-8 bg-neutral p-10',
      )}
    >
      <div className="flex items-center">
        <button className="hover:opacity-75" key="back">
          <FaArrowLeft className="mr-4 text-xl" />
        </button>

        <h4 className="font-bold text-natural-700">
          Quản lý đặt chỗ - Sơ đồ sân
        </h4>
      </div>
      {fieldNames.length > 0 && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {fieldNames.map((fieldName, index) => (
            <Button
              type="primary"
              key={index}
              onClick={() => handleButtonClick(index)}
            >
              {`Sân ${fieldName}`}
            </Button>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4">
        <p className="body-4 font-medium">Tên sân</p>
        <p className="body-3 font-bold">Sân bóng đá Vạn Phúc</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="body-4 font-medium">Tổng</p>
        <p className="body-3 font-bold">{fieldNames.length} sân</p>
      </div>
    </div>
  );
};

export default FieldMap;
