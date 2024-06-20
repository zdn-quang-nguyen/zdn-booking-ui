import { getLocation } from './api/createSportFieldService';
import FormCreateSportField from './components/FormCreateSportField';

const OwnerCreateSportFieldPage = async () => {
  const { provinces, districts, wards } = await getLocation();
  console.log({ provinces, districts, wards });
  return (
    <div className="item-center flex h-full w-full flex-col justify-center">
      <FormCreateSportField
        provinces={provinces}
        districts={districts}
        wards={wards}
      />
    </div>
  );
};

export default OwnerCreateSportFieldPage;
