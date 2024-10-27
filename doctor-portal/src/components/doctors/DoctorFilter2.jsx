/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Use standard
import FilterSelect from "../filter/FilterSelect";
import FilterByOrderPlusStatistic from "./FilterByOrderPlusStatistic";

import {
  updateCityChosen,
  updateSpecialityChosen,
  updateDoctorsOrder,
  updateDoctorsSort,
  updateHospitalChosen,
  updateFilteredDoctors,
} from "../../redux/actions/doctorFilterActions";
import { FaCity, FaUserDoctor } from "react-icons/fa6";
import { FaHospitalSymbol } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import {
  doctors_data,
  filterCityOptions,
  filterHospitalOptions,
  filterSpecialityOptions,
} from "../../utils/data";

export default function DoctorFilter({
  currentlyViewedDoctorsLastIndex,
  currentlyViewedDoctorsStartIndex,
}) {
  const dispatch = useDispatch();
  const { filteredDoctors, hospitalChosen, specialityChosen, cityChosen } =
    useSelector((store) => store.doctorFilter);

  const filterSpeciality = useCallback(
    (val) => {
      dispatch(updateSpecialityChosen(val));
    },
    [dispatch]
  );

  const filterHospital = useCallback(
    (val) => {
      dispatch(updateHospitalChosen(val));
    },
    [dispatch]
  );

  const filterCity = useCallback(
    (val) => {
      dispatch(updateCityChosen(val));
    },
    [dispatch]
  );

  const doctorFilterOptions = [
    {
      id: 1,
      options: filterCityOptions,
      icon: <FaCity />,
      categoryType: "city",
      categoryValue: cityChosen,
    },
    {
      id: 2,
      options: filterHospitalOptions,
      icon: <FaHospitalSymbol />,
      categoryType: "hospital",
      categoryValue: hospitalChosen,
    },
    {
      id: 3,
      options: filterSpecialityOptions,
      icon: <FaUserDoctor />,
      categoryType: "doctor",
      categoryValue: specialityChosen,
    },
  ];

  const updateDoctorFilterOptions = useCallback(() => {
    let duplicateFilteredDoctors = [...filteredDoctors];

    if (cityChosen && cityChosen != "") {
      duplicateFilteredDoctors = duplicateFilteredDoctors.filter(
        (doctor) => doctor.location.toLowerCase() == cityChosen.toLowerCase()
      );
    }

    if (specialityChosen && specialityChosen != "") {
      duplicateFilteredDoctors = duplicateFilteredDoctors.filter(
        (doctor) =>
          doctor.specialityChosen.toLowerCase() ==
          specialityChosen.toLowerCase()
      );
    }

    if (hospitalChosen && hospitalChosen != "") {
      duplicateFilteredDoctors = duplicateFilteredDoctors.filter(
        (doctor) =>
          doctor.hospital.toLowerCase() == hospitalChosen.toLowerCase()
      );
    }

    dispatch(updateFilteredDoctors(duplicateFilteredDoctors));
  }, [filteredDoctors, cityChosen, specialityChosen, hospitalChosen, dispatch]);

  useEffect(() => {
    updateDoctorFilterOptions();
  }, [cityChosen, specialityChosen, hospitalChosen]);

  if (!filteredDoctors) {
    return <p>Loading doctors...</p>;
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <div className=" flex flex-col gap-3 md:gap-5 lg:flex-row lg:items-center">
        <div className="text-primary font-semibold flex items-center gap-4 ">
          <span>Filters</span>
          <span>
            <IoFilter />
          </span>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 flex-1">
          {doctorFilterOptions.map((PageFilter) => {
            const {
              id,
              //   filterType,
              icon,
              categoryValue,
              options,
              categoryType,
            } = PageFilter;

            return (
              <FilterSelect
                options={options}
                categoryValue={categoryValue}
                // updateCategoryValue={filterFn}
                icon={icon}
                key={id}
                categoryType={categoryType}
                className="w-full md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(32px_/_3))]"
              />
            );
          })}
        </div>
      </div>

      {/* <FilterByOrderPlusStatistic
        currentlyViewedItemsLastIndex={currentlyViewedDoctorsLastIndex}
        currentlyViewedItemsStartIndex={currentlyViewedDoctorsStartIndex}
        sort={sort}
        updateSortFunc={updateSort}
        itemNameFiltered="doctors"
        items={filteredDoctors}
        order={order}
        updateOrderFunc={updateOrder}
        sortOptions={sortOptions}
      /> */}
    </div>
  );
}
