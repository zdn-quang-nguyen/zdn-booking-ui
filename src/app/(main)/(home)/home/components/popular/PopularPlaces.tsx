'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import PopularFilter from './PopularFilter';
import PopularList from './PopularList';
import useSearchSportFields from '@/hooks/useSearchSportFields';
import { Skeleton } from 'antd';

const PopularPlaces = () => {
<<<<<<< HEAD
  const router = useRouter(); // Update the type of 'router' to NextRouter
  const searchParams = useSearchParams();
  const page = searchParams.get('popular-page') ?? 1;
  const typeId = searchParams.get('popular') ?? 'all';
  const size = 4;

  const { sportFields, isLoading, totalPage } = useSearchSportFields({
    page: Number(page),
    typeId,
    size,
  });

  if (isLoading) {
    return <PopularPlacesSkeleton />;
  }
  if (!sportFields) {
    return null;
  }

=======
>>>>>>> da1954dcf3ecdf9d5970ef0f55aa153de86f0f17
  return (
    <div
      className="container mx-auto flex flex-col justify-center px-8 py-16"
      id="popular-places"
    >
      <h4 className="py-5 font-bold">Địa điểm nổi bật</h4>
      <PopularFilter />
      <PopularList />
    </div>
  );
};

export default PopularPlaces;
<<<<<<< HEAD

export const PopularPlacesSkeleton = () => {
  return (
    <div className="container mx-auto mb-6 mt-8 flex flex-col gap-6 divide-y xl:divide-y-0">
      {Array.from({ length: 1 }).map((_, index) => (
        <div className="grid grid-cols-4 gap-4" key={index}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton.Button
              key={index}
              style={{ width: '100%', height: '360px', borderRadius: '40px' }}
              active
            />
          ))}
        </div>
      ))}
    </div>
  );
};
=======
>>>>>>> da1954dcf3ecdf9d5970ef0f55aa153de86f0f17
