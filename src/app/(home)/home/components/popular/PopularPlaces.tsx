import SportFieldInfoCard from "@/components/sport-field/SportFieldInfoCard";
import React from "react";
import PopularItem from "./PopularItem";
import Pagination from "@/components/pagination/Pagination";

type PopularPlacesProps = {
  sportFields: SportField[];
};

const PopularPlaces = ({ sportFields }: PopularPlacesProps) => {
  const pagination = sportFields.slice(0, 5);
  return (
    <div className="container mx-auto flex flex-col justify-center py-16">
      <h4 className="font-bold py-5">Địa điểm nổi bật</h4>
      <div></div>
      <div className="flex flex-col gap-6 mb-6">
        {pagination.map((sportField) => (
          <PopularItem key={sportField.id} sportField={sportField} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default PopularPlaces;
