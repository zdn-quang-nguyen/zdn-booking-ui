import Item from '@/components/common/Item';

interface BookingProps {
  bookingList: any[];
  filter?: any;
}

const OwnerBooking: React.FC<BookingProps> = ({ filter, bookingList }) => {
  return (
    <div className="flex flex-col gap-3">
      {bookingList &&
        bookingList.map((booking: any, index: number) => (
          <Item key={index} data={booking} label="booking" />
        ))}
      <Item data={''} label="booking" />
      <Item data={''} label="booking" />
    </div>
  );
};

export default OwnerBooking;
