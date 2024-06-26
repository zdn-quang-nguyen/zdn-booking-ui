'use client';
import React, { useState } from 'react';
import AccentButton from './components/AccentButton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getValidFilterType } from '@/libs/utils';
import useSportFieldType from '@/hooks/useSportFieldType';

export const tabs: { [key: string]: string } = {
  basketball: 'Bóng rổ',
  volleyball: 'Bõng chuyền',
  badminton: 'Cầu lông',
  tennis: 'Tennis',
  football: 'Bóng đá',
  tableTennis: 'Bóng bàn',
  billiards: 'Bi-da',
};

interface FieldTypeFilterProps {
  onSelect: (value: string) => void;
  name?: string;
}

const FieldTypeFilter: React.FC<FieldTypeFilterProps> = ({
  onSelect,
  name = 'type',
}) => {
  // const [activeTab, setActiveTab] = useState('all');
  const { types, isLoading } = useSportFieldType();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get(name);
  const handleChangeTab = (value: string) => {
    onSelect(value);
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (tabs.keys.includes(currentTab + '')) {
    handleChangeTab('all');
  }

  const handleClick = (value: string) => {
    handleChangeTab(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const allBtn = {
    value: 'all',
    label: 'Tất cả',
  };
  return (
    <div className={`grid grid-cols-2 gap-3 md:grid-cols-4 xl:flex`}>
      <AccentButton
        key={allBtn.value}
        label={allBtn.label}
        value={allBtn.value}
        isActive={currentTab === allBtn.value}
        onClick={handleClick}
      />
      {types?.map((type) => (
        <AccentButton
          key={type.id}
          label={tabs[type.name] ?? type.name}
          value={type.id}
          isActive={currentTab === type.id}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default FieldTypeFilter;
