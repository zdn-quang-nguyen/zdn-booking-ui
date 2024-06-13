import React from 'react';
import { FilterItem } from './components/FilterItem';
import { CloseOutlined } from '@ant-design/icons';
import { generateTimeSteps } from './functions/TimeSlotTable';
import AccentButton from './components/AccentButton';

const timeSlot = generateTimeSteps('00:00', '24:00', 30);

const options = timeSlot.map((slot) => {
  return {
    label: slot,
    value: slot.toString(),
  };
});

const distanceFilter = {
  title: 'Khoang cach',
  name: 'distance',
  options: [
    {
      label: 'Xa nhat',
      value: 'far',
    },
    {
      label: 'Gan nhat',
      value: 'near',
    },
  ],
};

const priceFilter = {
  title: 'Gia ca',
  name: 'price',
  options: [
    {
      label: 'Thap nhat',
      value: 'low',
    },
    {
      label: 'Cao nhat',
      value: 'high',
    },
  ],
};

const timeFilter = {
  title: 'Thoi gian',
  name: 'time',
  options: options,
};

export const SportFieldFilters: React.FC = () => {
  const [price, setPrice] = React.useState<string>(
    priceFilter.options[0].value,
  );
  const [distance, setDistance] = React.useState<string>(
    distanceFilter.options[0].value,
  );
  const handleFilterChangePrice = (value: string) => {
    setPrice(value);
  };

  const handleFilterChangeDistance = (value: string) => {
    setDistance(value);
  };

  const handleApplyFilter = () => {
    console.log('Distance: ', distance);
    console.log('Price: ', price);
  };

  return (
    <div className="flex flex-col justify-between items-center w-[480px] px-10 rounded-s-[40px] shadow-2xl h-screen absolute top-0 right-0 bg-neutral">
      <div className="flex flex-col w-[400px] gap-6">
        <div
          className={`flex flex-row justify-between items-center  body-1 font-bold py-6 h-[88px]`}
        >
          <span>Bộ lọc</span>
          <button className="w-10 h-10">
            <CloseOutlined style={{ fontSize: '24px' }} spin />
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <FilterItem
            filter={distanceFilter}
            onFilterChange={handleFilterChangeDistance}
          ></FilterItem>

          <FilterItem
            filter={priceFilter}
            onFilterChange={handleFilterChangePrice}
          ></FilterItem>

          <FilterItem
            filter={timeFilter}
            onFilterChange={() => {}}
          ></FilterItem>
        </div>
      </div>

      <div className={`w-full flex flex-row gap-10 pb-10`}>
        <AccentButton
          label="Áp dụng"
          value="apply"
          isActive={true}
          onClick={handleApplyFilter}
          style="flex-grow"
        ></AccentButton>
        <button
          className={`border-b-2 text-natural-400 border-natural-400 hover:text-accent-600 hover:border-accent-600`}
        >
          <span className="w w-fit body-3 font-bold">Xoa bo loc</span>
        </button>
      </div>
    </div>
  );
};
