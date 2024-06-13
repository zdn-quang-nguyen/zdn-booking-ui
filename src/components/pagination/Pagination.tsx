"use client";
import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function Pagination() {
  const [page, setPage] = useState(1);

  const handleArrowRight = () => {
    if (page + 1 > 4) {
      setPage((page + 1) % 4);
    } else setPage(page + 1);
  };
  console.log(page);
  const handleArrowLeft = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <div>
      <div className="flex items-center">
        <div className="w-[52px] h-[52px] flex items-center justify-start">
          <FaArrowLeft
            onClick={handleArrowLeft}
            className={`cursor-pointer text-2xl ${
              page === 1 ? `text-neutral-200` : "text-primary-500"
            }`}
          />
        </div>
        <div className="flex items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className={`w-2.5 h-2.5 rounded-full mr-3 ${
                page === index + 1 ? "bg-primary-500" : "bg-neutral-200"
              }  `}
            ></span>
          ))}
        </div>
        <div className="w-[52px] h-[52px] flex items-center justify-end">
          <FaArrowRight
            onClick={handleArrowRight}
            className="cursor-pointer text-2xl text-primary-500"
          />
        </div>
      </div>
    </div>
  );
}
