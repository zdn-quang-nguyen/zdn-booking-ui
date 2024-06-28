import DatePickerComponent from '@/components/common/DatePickerComponent';
import RangePickerComponent from '@/components/common/RangePickerComponent';
import { Input } from 'antd';
import SuggestBookingItem from './SuggestBookingItem';

//
interface SuggestBookingProps {
  firstChild?: any;
  booking: any;
}

const SuggestBooking: React.FC<SuggestBookingProps> = ({ booking }) => {
  return (
    <div className="flex flex-col gap-5">
      <span className="body-3 font-bold text-natural-700">Gợi ý khác</span>
      <div className="flex flex-col gap-3">
        <SuggestBookingItem />
        <SuggestBookingItem isFirstChild={false} />
      </div>
    </div>
  );
};

export default SuggestBooking;
