//

import DatePickerComponent from '@/components/common/DatePickerComponent';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import AccentButton from '@/components/common/components/AccentButton';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import styles from './styles/Booking.module.scss';

interface SuggestBookingItemProps {
  startTime?: string;
  endTime?: string;
  fieldId?: string;
  fieldName?: string;
  isFirstChild?: boolean;
}

const SuggestBookingItem: React.FC<SuggestBookingItemProps> = (props) => {
  const { startTime, endTime, fieldId, fieldName, isFirstChild } = props;

  const handleClick = (value: any) => {
    console.log('click');
  };

  return (
    <div
      className={`flex flex-col justify-between gap-3 sm:flex-row sm:items-center ${styles.itemContainer}`}
    >
      <div className="flex flex-col gap-3">
        <span
          className={`body-4 font-medium text-natural-700 ${isFirstChild ? '' : 'hidden'}`}
        >
          Sân
        </span>
        <Input
          readOnly
          value={8}
          type="text"
          className="body-4 text-natural-700"
        />
      </div>
      <div className="flex flex-col gap-3">
        <span
          className={`body-4 font-medium text-natural-700 ${isFirstChild ? '' : 'hidden'}`}
        >
          Ngày
        </span>
        <DatePickerComponent
          defaultValue={startTime ? startTime : undefined}
          disabled={true}
        />
      </div>
      <div className="flex flex-col gap-3">
        <span
          className={`body-4 font-medium text-natural-700 ${isFirstChild ? '' : 'hidden'}`}
        >
          Khung giờ
        </span>
        <RangePickerComponent
          defaultValue={startTime && endTime ? [startTime, endTime] : undefined}
          disabled={true}
        />
      </div>

      <AccentButton
        disabled={false}
        key={1}
        label={<PlusOutlined style={{ fontSize: '20px', padding: '10px' }} />}
        value={fieldId ? fieldId : ''}
        isActive={false}
        onClick={handleClick}
      />
    </div>
  );
};

export default SuggestBookingItem;
