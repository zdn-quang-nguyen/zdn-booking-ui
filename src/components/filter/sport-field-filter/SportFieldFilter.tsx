'use client';
import FieldTypeFilter from '@/components/common/FieldTypeFilter';
import { cn } from '@/libs/utils';
import { Button } from 'antd';
import React, { PropsWithChildren } from 'react';
import { RiFilter2Fill } from 'react-icons/ri';

type SportFieldFiltersProps = {
  children: React.ReactNode;
};

const SportFieldFilters: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={cn('flex justify-between items-center')}>
      <FieldTypeFilter onSelect={() => {}} />
      {children}
    </div>
  );
};

export default SportFieldFilters;
