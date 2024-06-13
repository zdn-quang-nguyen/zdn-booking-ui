'use client';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';
import { Button } from 'antd';
import React from 'react';
import { RiFilter2Fill } from 'react-icons/ri';

const PopularFilter = () => {
  return (
    <SportFieldFilters>
      <Button>
        <RiFilter2Fill />
        <span>Lọc</span>
      </Button>
    </SportFieldFilters>
  );
};

export default PopularFilter;
