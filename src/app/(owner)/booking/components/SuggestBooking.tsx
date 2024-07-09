'use client';

import SuggestBookingItem from './SuggestBookingItem';

//
interface SuggestBookingProps {
  // firstChild?: any;
  booking: any;
  fields?: any;
  startTime?: any;
  endTime?: any;

  onClick: (value: any) => void;
}

const SuggestBooking: React.FC<SuggestBookingProps> = ({
  booking,
  fields = [],
  startTime,
  endTime,
  onClick,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <span className="body-3 font-bold text-natural-700">Gợi ý khác</span>
      <div className="flex flex-col gap-3">
        {fields &&
          fields.map((field: any, index: any) => {
            return (
              <SuggestBookingItem
                isFirstChild={index === 0}
                startTime={startTime}
                endTime={endTime}
                fieldId={field?.id}
                fieldName={field?.name}
                onClick={onClick}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SuggestBooking;
