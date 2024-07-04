'use client';
import CustomTimePicker from '@/components/filter/CustomTimePicker';
import SportFieldFilters from '@/components/filter/sport-field-filter/SportFieldFilter';
type TimeFilterProps = { onsubmit: (data: any) => void };
const TimeFilter = ({ onsubmit }: TimeFilterProps) => {
  return (
    <div>
      <SportFieldFilters className="flex-wrap" name="time">
        <CustomTimePicker onsubmit={onsubmit} />
      </SportFieldFilters>
    </div>
  );
};

export default TimeFilter;
