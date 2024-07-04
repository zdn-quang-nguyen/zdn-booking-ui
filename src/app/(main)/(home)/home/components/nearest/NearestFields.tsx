<<<<<<< HEAD
'use client';
import { sportField } from '@/mocks/sport-fields';
import NearestCard from './NearestCard';
import NearestImage from './NearestImage';
import { getSportFields } from '@/libs/api/sport-field.api';
import useGetLocation from '@/hooks/useGetLocation';
import useSearchSportFields from '@/hooks/useSearchSportFields';
=======
import { getSportFields } from '@/libs/api/sport-field-server.api';
import NearestCard from './NearestCard';
import NearestImage from './NearestImage';
>>>>>>> da1954dcf3ecdf9d5970ef0f55aa153de86f0f17

const NearestFields = () => {
  const query = {
    distanceOrder: 'ASC',
  };
  const { sportFields } = useSearchSportFields({
    page: 1,
    size: 7,
    query: JSON.stringify(query),
  });

  return (
    <div className="bg-primary-100 px-8">
      <div className="container mx-auto grid grid-cols-1 place-content-center justify-center gap-4 py-16 md:grid-cols-4">
        <NearestCard />
        {sportFields?.map((sportField) => (
          <NearestImage key={sportField.id} sportField={sportField} />
        ))}
      </div>
    </div>
  );
};
export default NearestFields;
