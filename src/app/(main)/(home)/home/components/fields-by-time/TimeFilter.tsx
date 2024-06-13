import CustomTimePicker from '@/components/filter/CustomTimePicker';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';
import { Button } from 'antd';
import React from 'react';
import { RiFilter2Fill } from 'react-icons/ri';

const TimeFilter = () => {
  return (
    <div>
      <SportFieldFilters>
        <CustomTimePicker />
      </SportFieldFilters>
    </div>
  );
};

export default TimeFilter;
