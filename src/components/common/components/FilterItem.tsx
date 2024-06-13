import React, { useState } from 'react';
import { TimePicker, Dropdown, Menu } from 'antd';
import dayjs from 'dayjs';
import {
  ArrowRightOutlined,
  CaretDownFilled,
  ClockCircleOutlined,
} from '@ant-design/icons';
import RadioBtn from './RadioButton';
import DatePickerComponent from '../DatePickerComponent';

import styles from '../styles/FilterItem.module.scss';
import Arrow from '@public/icons/ArrowNarrowRight.svg';
import Image from 'next/image';

interface OptionItem {
  label: string;
  value: string;
}
interface FilterItemProps {
  filter: {
    title: string;
    name: string;
    options: OptionItem[];
  };
  onFilterChange: (filter: any) => void;
}

const { RangePicker } = TimePicker;

export const FilterItem: React.FC<FilterItemProps> = ({
  filter,
  onFilterChange,
}) => {
  const [activeTab, setActiveTab] = useState(filter.options[0].value);
  const [open, setOpen] = useState(true);
  const handleFilterChange = (value: string) => {
    onFilterChange(value);
    setActiveTab(value);
  };

  return (
    <div className={`flex flex-col gap-5 w-full`}>
      <div className={`flex flex-row justify-between`}>
        <span className={`body-3 font-bold text-natural-700 w-full`}>
          {filter.title}
        </span>
        <CaretDownFilled onClick={() => setOpen(!open)} />
      </div>
      {open &&
        (filter.name === 'time' ? (
          <div className={`flex flex-col gap-3 w-full`}>
            <DatePickerComponent></DatePickerComponent>
            <div
              className={`${styles.rangePicker} flex flex-row gap-3 items-center`}
            >
              <label className={`body-3 text-natural-700`}>Thời gian</label>
              <RangePicker
                showTime={{
                  minuteStep: 30,
                }}
                format="HH:mm"
                suffixIcon={
                  <ClockCircleOutlined
                    style={{ fontSize: '20px', color: '#939393' }}
                  />
                }
                separator={<Image src={Arrow} alt="arrow" className={``} />}
                className={`flex-grow flex items-center justify-start gap-4`}
              />
            </div>
          </div>
        ) : (
          <div className={`flex flex-col gap-3 w-full`}>
            {filter.options.map((option, index) => (
              <RadioBtn
                key={option.value}
                label={option.label}
                value={option.value}
                isActive={activeTab}
                onClick={handleFilterChange}
              ></RadioBtn>
            ))}
          </div>
        ))}
      {filter.name !== 'time' && (
        <span className="w-full border-b border-natural-200 pt-3"></span>
      )}
    </div>
  );
};
