'use client';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { SportFieldFilters as Filter } from '@/components/common/SportFieldFilters';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';
import { cn } from '@/libs/utils';
import { FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const PopularFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = React.useState<boolean>(false);

  const toggleFilter = (value: boolean) => {
    setIsFilterOpen(value);
  };

  return (
    <div
      className={cn(
        'flex flex-row flex-wrap items-center justify-between gap-3',
      )}
    >
      <FieldTypeFilter name="popular" pageName="popular-page" />
      <Button onClick={() => toggleFilter(!isFilterOpen)}>
        <FilterOutlined />
        <span>Lọc</span>
      </Button>
      <Filter isOpen={isFilterOpen} onClick={setIsFilterOpen} />
    </div>
  );
};

export default PopularFilter;
