/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Use standard

import { FaCity, FaUserDoctor } from "react-icons/fa6";
import { FaHospitalSymbol } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import {
  doctors_data,
  filterCityOptions,
  filterHospitalOptions,
  filterSpecialityOptions,
} from "../../utils/data";
import FilterSelect from "../filter/FilterSelect";
import {
  updateCityChosenDoctor,
  updateDoctorsOrder,
  updateDoctorsSort,
  updateFilteredDoctors,
  updateHospitalChosen,
  updateSpecialityChosen,
} from "../../store/doctorsSlice";

export default function DoctorFilter({
  currentlyViewedDoctorsLastIndex,
  currentlyViewedDoctorsStartIndex,
}) {
  const dispatch = useDispatch(); // Use useDispatch from react-redux
  const {
    cityChosen,
    specialityChosen,
    hospitalChosen,
    sort,
    order,
    filteredDoctors,
  } = useSelector((state) => state.doctors); // Use useSelector to get the state

  const [filterDoctorOptions, setFilterDoctorOptions] = useState({});
  const sortOptions = ["Name", "Speciality", "City"];

  const filterCity = useCallback(
    (val) => {
      console.log("called city change");

      dispatch(updateCityChosenDoctor(val));
    },
    [dispatch]
  );

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

  const updateSort = (val) => {
    dispatch(updateDoctorsSort(val));
  };

  const updateOrder = (val) => {
    dispatch(updateDoctorsOrder(val));
  };

  const doctorFilterOptions = [
    {
      id: 4,
      icon: <FaCity />,
      categoryTitle: "City",
      categoryValue: cityChosen,
      categoryValues: filterCityOptions,
      filterFn: filterCity,
      filterType: "select one",
      categoryType: "city",
    },
    {
      id: 5,
      icon: <FaUserDoctor />,
      categoryTitle: "Speciality",
      categoryValue: specialityChosen,
      categoryValues: filterSpecialityOptions,
      filterFn: filterSpeciality,
      filterType: "select one",
      categoryType: "speciality",
    },
    {
      id: 6,
      icon: <FaHospitalSymbol />,
      categoryTitle: "Hospital",
      categoryValue: hospitalChosen,
      categoryValues: filterHospitalOptions,
      filterFn: filterHospital,
      filterType: "select one",
      categoryType: "hospital",
    },
  ];

  const updateFilterDoctorOptions = useCallback(() => {
    let duplicateFilterDoctorOptions = { ...filterDoctorOptions };
    let duplicateFilteredDoctors = [...doctors_data];

    if (cityChosen && cityChosen !== "") {
      duplicateFilterDoctorOptions.city = cityChosen;
      duplicateFilteredDoctors = duplicateFilteredDoctors.filter(
        (doctor) => doctor.location.toLowerCase() == cityChosen.toLowerCase()
      );
    } else {
      delete duplicateFilterDoctorOptions.city;
    }

    if (specialityChosen && specialityChosen !== "") {
      duplicateFilterDoctorOptions.speciality = specialityChosen;
      duplicateFilteredDoctors = duplicateFilteredDoctors.filter(
        (doctor) =>
          doctor.speciality.toLowerCase() == specialityChosen.toLowerCase()
      );
    } else {
      delete duplicateFilterDoctorOptions.speciality;
    }

    if (hospitalChosen && hospitalChosen !== "") {
      duplicateFilterDoctorOptions.hospital = hospitalChosen;
      duplicateFilteredDoctors = duplicateFilteredDoctors.filter(
        (doctor) =>
          doctor.hospital.toLowerCase() == hospitalChosen.toLowerCase()
      );
    } else {
      delete duplicateFilterDoctorOptions.hospital;
    }

    if (sort && sort !== "") {
      duplicateFilterDoctorOptions.sortBy = sort.toLowerCase();
    } else {
      delete duplicateFilterDoctorOptions.sortBy;
    }

    if (order && order !== "") {
      duplicateFilterDoctorOptions.order =
        order === "A-Z" ? "asc" : order === "Z-A" ? "desc" : "asc";
    } else {
      delete duplicateFilterDoctorOptions.order;
    }

    dispatch(updateFilteredDoctors(duplicateFilteredDoctors));
    setFilterDoctorOptions(duplicateFilterDoctorOptions);
  }, [
    filterDoctorOptions,
    cityChosen,
    specialityChosen,
    hospitalChosen,
    sort,
    order,
    dispatch,
  ]);

  useEffect(() => {
    updateFilterDoctorOptions();
  }, []);

  useEffect(() => {
    updateFilterDoctorOptions();
    console.log("city chosen: ", cityChosen);
    console.log("speciality: ", specialityChosen);
  }, [cityChosen, specialityChosen, hospitalChosen, sort, order]);

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
              categoryValues,
              filterFn,
              categoryType,
            } = PageFilter;

            return (
              <FilterSelect
                options={categoryValues}
                categoryValue={categoryValue}
                updateCategoryValue={filterFn}
                icon={icon}
                key={id}
                categoryType={categoryType}
                className="w-full md:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(32px_/_3))]"
              />
            );
          })}
        </div>
      </div>
      {/* 
      <FilterByOrderPlusStatistic
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
