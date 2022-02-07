import React, { Dispatch, SetStateAction } from "react";

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
  const numberOfPages = [];
  for (let i = 1; i <= countOfPages; i++) {
    numberOfPages.push(i);
  }

  return (
    <div className='py-5 flex justify-end'>
      <div className="flex gap-x-1">
        {numberOfPages.map((num: number) => (
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
      </div>
    </div>
  );
};

export default Pagination;
