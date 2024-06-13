import Pagination from "@/components/pagination/Pagination";
import SportFieldInfoCard from "@/components/sport-field/SportFieldInfoCard";
import React from "react";

type SportFieldsByTimeProps = {
  sportFields: SportField[];
};

const SportFieldsByTime = ({ sportFields }: SportFieldsByTimeProps) => {
  const pagination = sportFields.slice(0, 4);
  return (
    <div className="container mx-auto flex flex-col justify-center py-16">
      <h4 className="font-bold py-5">Địa điểm nổi bật</h4>
      <div></div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {pagination.map((sportField) => (
          <SportFieldInfoCard key={sportField.id} sportField={sportField} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default SportFieldsByTime;
