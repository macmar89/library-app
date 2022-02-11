import React, { Dispatch, SetStateAction } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

interface IPagination {
  currentPage?: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  countOfPages: number;
}

const Pagination = ({ setCurrentPage, countOfPages }: IPagination) => {
  const handlePageChange = (e: any) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <div className="py-5 flex justify-end select-none">
      <ReactPaginate
        pageCount={countOfPages}
        nextLabel={<BsChevronDoubleRight />}
        previousLabel={<BsChevronDoubleLeft />}
        onPageChange={handlePageChange}
        className={"flex items-center"}
        pageClassName={"py-2 px-3 hover:bg-gray-500 transition cursor-pointer"}
      />
    </div>
  );
};

export default Pagination;
