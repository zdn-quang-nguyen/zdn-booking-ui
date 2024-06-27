import Item from '@/components/common/Item';

function Transaction() {
  return (
    <div className="flex flex-col gap-3">
      <Item data={''} label="booking" />
      <Item data={''} label="transaction" />
    </div>
  );
}

export default Transaction;
