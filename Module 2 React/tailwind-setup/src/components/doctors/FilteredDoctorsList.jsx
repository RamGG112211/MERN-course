/* eslint-disable react/prop-types */
"use client";

import { useDispatch, useSelector } from "react-redux";
import { updateDoctorsCurrentlyViewedPageNum } from "../../redux/actions/doctorFilterActions";
import DoctorCard from "./DoctorCard";
import Pagination from "../filter/Pagination";

export default function FilteredDoctorsList({
  totalDoctors,
  page,
  numOfDoctorsPerPage,
  onPageChange,
  totalPage,
  currentlyViewedDoctorsStartIndex,
  currentlyViewedDoctorsLastIndex,
}) {
  const dispatch = useDispatch();
  const { filteredDoctors } = useSelector((store) => store.doctorFilter);

  const handlePageChange = (newPage) => {
    dispatch(updateDoctorsCurrentlyViewedPageNum(newPage));
    onPageChange(newPage);
  };

  if (!filteredDoctors) {
    return <p>Loading doctors...</p>;
  } else if (filteredDoctors.length === 0) {
    return <p>No doctors found according to your filters.</p>;
  } else {
    return (
      <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-9">
        <div className="flex flex-wrap gap-4 lg:gap-5">
          {filteredDoctors
            .slice(
              currentlyViewedDoctorsStartIndex,
              currentlyViewedDoctorsLastIndex
            )
            .map((doctor) => (
              <DoctorCard
                doctor={doctor}
                key={doctor.id}
                className="w-full sm:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(40px_/_3))] xl:w-[calc(25%_-_20px)]"
              />
            ))}
        </div>

        {totalDoctors && totalPage && (
          <Pagination
            totalItems={totalDoctors}
            totalPage={totalPage}
            numOfItemsPerPage={numOfDoctorsPerPage}
            page={page}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  }
}
