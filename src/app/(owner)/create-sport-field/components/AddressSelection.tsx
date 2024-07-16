import { Select } from 'antd';
import { Location } from './AddressSearch';

interface AddressSelectionProps {
  selections: Location[];
}

const AddressSelection: React.FC<AddressSelectionProps> = ({ selections }) => {
  return (
    <>
      {selections.length > 0 &&
        selections?.map((item: Location, index: number) => {
          return (
            <Select.Option key={index} value={JSON.stringify(item)}>
              {item.display_name
                ? item.display_name
                : item.displayName
                  ? item.displayName
                  : item.name}
            </Select.Option>
          );
        })}
    </>
  );
};

export default AddressSelection;
