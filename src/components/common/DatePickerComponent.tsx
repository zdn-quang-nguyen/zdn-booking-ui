'use client';

import React from 'react';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import styles from './styles/DatePickerComponent.module.scss';
import Calendar from '@public/icons/calendar.svg';
import Image from 'next/image';

interface DatePickerComponentProps {
  label?: string;
  style?: string;
  defaultValue?: string;
  onChange?: (value: any) => void;
  disabled?: boolean;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {
  const { label, style, onChange, defaultValue, disabled } = props;
  const [date, setDate] = React.useState<dayjs.Dayjs>(
    defaultValue ? dayjs(defaultValue, 'DD/MM/YYYY') : dayjs(),
  );

  const handleChange = () => (value: any) => {
    setDate(value);
    onChange && onChange(value);
  };

  return (
    <Space direction="vertical" size={10} className={``}>
      <div
        className={`${styles.picker} flex flex-row items-center justify-end gap-3`}
      >
        {label && (
          <p className="body-4 font-medium text-natural-700">{label}</p>
        )}
        <DatePicker
          disabled={disabled && disabled}
          defaultValue={
            defaultValue
              ? dayjs(defaultValue, 'DD/MM/YYYY')
              : // : dayjs(dayjs(), 'DD/MM/YYYY')
                undefined
          }
          value={defaultValue ? date : undefined}
          format="DD/MM/YYYY"
          locale={locale}
          suffixIcon={
            <Image src={Calendar} alt="calendar" width={20} height={20} />
          }
          onChange={handleChange()}
          className={`body-4`}
        />
      </div>
    </Space>
  );
};

export default DatePickerComponent;
