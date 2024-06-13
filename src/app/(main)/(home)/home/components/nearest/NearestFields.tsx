import { sportField } from "@/mocks/sport-fields";
import NearestCard from "./NearestCard";
import NearestImage from "./NearestImage";

type NearestFieldsProps = {
  sportFields: SportField[];
};
const NearestFields = ({ sportFields }: NearestFieldsProps) => {
  const NUMBER_OF_NEAREST_FIELDS = 7;
  const newSportFields = sportFields.slice(0, NUMBER_OF_NEAREST_FIELDS);
  return (
    <div className="bg-primary-100">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center justify-center gap-4 mx-auto py-16">
        <NearestCard />
        {newSportFields.map((sportField) => (
          <NearestImage key={sportField.id} sportField={sportField} />
        ))}
      </div>
    </div>
  );
};
export default NearestFields;
