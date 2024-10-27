/* eslint-disable react/prop-types */
import React from "react";

const Pagination = ({
  totalItems,
  page,
  numOfItemsPerPage,
  onPageChange,
  className,
  totalPage,
}) => {
  const pageNumbers = [];
  if (totalPage <= 8) {
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (page <= 4) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPage - 1);
      pageNumbers.push(totalPage);
    } else if (page >= totalPage - 3) {
      pageNumbers.push(1);
      pageNumbers.push(2);
      pageNumbers.push("...");
      for (let i = totalPage - 4; i <= totalPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push(2);
      pageNumbers.push("...");
      for (let i = page - 1; i <= page + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPage - 1);
      pageNumbers.push(totalPage);
    }
  }

  const handlePageClick = (pageNumber) => {
    if (typeof pageNumber === "number") {
      onPageChange(pageNumber);
    }
  };

  if (totalPage > 1)
    return (
      <div
        className={`flex justify-center items-center gap-1 sm:gap-2 text-sm sm:text-base ${className}`}
      >
        <button
          className={`${
            page === 1 ? "pointer-events-none bg-primary/65" : "bg-primary"
          }  text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md`}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <div className=" flex gap-[2px] sm:gap-1 items-center">
          {pageNumbers.map((pageNum, index) => (
            <React.Fragment key={index}>
              {pageNum === "..." ? (
                <span className="grid items-center justify-center md:w-[40px] md:h-[40px] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px]">
                  {pageNum}
                </span>
              ) : (
                <button
                  className={`${
                    pageNum === page
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-primary/25"
                  } grid items-center justify-center md:w-[40px] md:h-[40px] w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] rounded-md`}
                  onClick={() => handlePageClick(pageNum)}
                >
                  {pageNum}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <button
          className={`${
            page === totalPage
              ? "pointer-events-none bg-primary/65"
              : "bg-primary"
          } bg-primary text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md`}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPage}
        >
          Next
        </button>
      </div>
    );
};

export default Pagination;
