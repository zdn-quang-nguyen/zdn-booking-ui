'use client';

import Item from '@/components/common/Item';
import Transaction from './components/Transaction';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { Form, Select } from 'antd';
import { BOOKING_STATUS, BOOKING_STATUS_MAPPING } from '@/constants/constant';
import styles from './page.module.scss';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import DatePickerComponent from '@/components/common/DatePickerComponent';
import { Input } from 'antd';
import SearchBar from '@/components/header/customer-header/components/Search';

const { Search } = Input;

function Page() {
  const onSelect = (value: string) => {
    console.log(value);
  };
  return (
    <div
      className={`m-auto flex h-full flex-grow flex-col gap-8 bg-white p-10 sm:w-full md:w-4/5 lg:w-3/4 xl:w-2/3 ${styles.page}`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-natural-700">Lịch Sử Giao Dịch</h4>
          <FieldTypeFilter onSelect={onSelect} />
        </div>
        <div>
          <Search
            placeholder="Tìm kiếm giao dịch"
            className="body-3 text-natural-400"
          />
        </div>
        <div className={`${styles.select} flex flex-row items-center gap-3`}>
          <p className="body-4 font-medium text-natural-700">
            Tình trạng đặt sân
          </p>
          <Select
            className={`h-12 w-48 ${styles.select}`}
            defaultValue={BOOKING_STATUS[0]}
            options={BOOKING_STATUS.map((status) => ({
              label: BOOKING_STATUS_MAPPING[status],
              value: status,
            }))}
          />
        </div>
        <div className={`${styles.select} flex flex-row items-center gap-3`}>
          <p className="body-4 font-medium text-natural-700">
            Khoảng thời gian
          </p>
          <DatePickerComponent />
          <RangePickerComponent />
        </div>
      </div>
      <Transaction />
    </div>
  );
}

export default Page;
