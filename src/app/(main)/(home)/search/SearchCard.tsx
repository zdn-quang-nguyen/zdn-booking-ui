import SportFieldSwiper from '@/components/common/SportFieldSwiper';
import SportFieldInfoCard from '@/components/sport-field/SportFieldInfoCard';

type SearchCardProps = {
  sportField: SportField;
};

const SearchCard = ({ sportField }: SearchCardProps) => {
  const imageUrls = sportField.sportFieldImages?.map((image) => image.url);

  return (
    <div className="grid grid-cols-1 rounded-large bg-primary-100 md:grid-cols-2">
      <SportFieldInfoCard className="w-[312px]" sportField={sportField} />
      <SportFieldSwiper className="" images={imageUrls} />
    </div>
  );
};
export default SearchCard;
