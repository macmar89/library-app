import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

interface IPagination {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  countOfPages: number;
}

const Pagination = ({
  currentPage,
  setCurrentPage,
  countOfPages,
}: IPagination) => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (numbers.length === 0) setNumbers([1, 2, 3, 4, 5]);

    if (currentPage > 0 && currentPage < 3) setNumbers([1, 2, 3, 4, 5]);

    if (currentPage > 2 && currentPage < countOfPages - 1)
      setNumbers([
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ]);

    if (currentPage < countOfPages && currentPage > countOfPages - 2)
      setNumbers([
        countOfPages - 4,
        countOfPages - 3,
        countOfPages - 2,
        countOfPages - 1,
        countOfPages,
      ]);
  }, [currentPage]);

  return (
    <div className="py-5 flex justify-end">
      <div className="flex items-center gap-x-1">
        <BsChevronDoubleLeft onClick={() => setCurrentPage(1)} className='cursor-pointer' />
        {numbers?.map((num: number) => (
          <div
            key={num}
            onClick={() => setCurrentPage(num)}
            className={`py-2 px-3 ${
              currentPage === num ? "bg-gray-500" : null
            }  hover:bg-gray-500 transition cursor-pointer`}
          >
            {num}
          </div>
        ))}
        <BsChevronDoubleRight onClick={() => setCurrentPage(15)} className='cursor-pointer'/>
      </div>
    </div>
  );
};

export default Pagination;
