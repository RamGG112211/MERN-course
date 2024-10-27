"use client";

import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom"; // Change here for React Router
import { filterCityOptions, filterSpecialityOptions } from "../../utils/data";
import { LiaHospitalSymbolSolid } from "react-icons/lia";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { FaCity } from "react-icons/fa";
import Button from "../global/Button";
import { useDispatch, useSelector } from "react-redux";
import ProviderSearchInput from "./ProviderSearchInput";
import FilterSelect from "../filter/FilterSelect";
import { updateCityChosenHospital } from "../../store/hospitalsSlice";
import {
  updateCityChosenDoctor,
  updateSpecialityChosen,
} from "../../store/doctorsSlice";
import {
  updateCitySearched,
  updateSpecialitySearched,
} from "../../store/providersSearchSlice";

export default function SearchProviders() {
  const navigate = useNavigate(); // Change from useRouter to useNavigate
  const dispatch = useDispatch();

  const { citySearched, specialitySearched } = useSelector(
    (store) => store.providersSearch
  );

  const [inputProvider, setInputProvider] = useState("");

  const updateInputProvider = (val) => {
    setInputProvider(val);
  };

  const filterCity = useCallback(
    (val) => {
      if (
        inputProvider.toLowerCase() === "hospital" ||
        inputProvider.toLowerCase() === "hospitals"
      ) {
        dispatch(updateCityChosenHospital(val));
      } else {
        dispatch(updateCityChosenDoctor(val));
      }
      dispatch(updateCitySearched(val));
    },
    [dispatch, inputProvider]
  );

  const filterSpeciality = useCallback(
    (val) => {
      dispatch(updateSpecialityChosen(val));
      dispatch(updateSpecialitySearched(val));
    },
    [dispatch]
  );

  const search_inputs = [
    {
      id: 1,
      icon: <LiaHospitalSymbolSolid />,
      placeholder: "Ex. Doctor, Hospital",
      onChangeFunc: updateInputProvider,
      filterType: "input_search",
    },
    {
      id: 4,
      icon: <FaCity />,
      categoryTitle: "City",
      categoryValue: citySearched,
      categoryValues: filterCityOptions,
      filterFn: filterCity,
      filterType: "select one",
    },
    {
      id: 5,
      icon: <FaUserDoctor />,
      categoryTitle: "Speciality",
      categoryValue: specialitySearched,
      categoryValues: filterSpecialityOptions,
      filterFn: filterSpeciality,
      filterType: "select one",
    },
  ];

  const handleSearch = () => {
    if (inputProvider && inputProvider.length >= 5) {
      if (
        inputProvider.toLowerCase() === "hospital" ||
        inputProvider.toLowerCase() === "hospitals"
      ) {
        navigate("/hospitals"); // Change from router.push to navigate
        if (citySearched === "") {
          dispatch(updateCityChosenHospital(""));
        }
      } else if (
        inputProvider.toLowerCase() === "doctor" ||
        inputProvider.toLowerCase() === "doctors"
      ) {
        navigate("/doctors"); // Change from router.push to navigate
        if (citySearched === "") {
          dispatch(updateCityChosenDoctor(""));
        }
      }
    } else if (
      !inputProvider ||
      inputProvider === "" ||
      inputProvider.length < 5
    ) {
      if (
        (specialitySearched && specialitySearched !== "") ||
        (citySearched && citySearched !== "")
      ) {
        navigate("/find-doctors"); // Change from router.push to navigate
        if (citySearched === "") {
          dispatch(updateCityChosenDoctor(""));
        }
        if (specialitySearched === "") {
          dispatch(updateSpecialityChosen(""));
        }
      }
    }

    setInputProvider("");
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-4 md:p-5 flex flex-col gap-5 md:gap-6 xl:gap-8 translate-y-1/2">
      {/*search by input*/}
      <div className="flex flex-col lg:flex-row gap-2">
        <div className="flex flex-col gap-2 lg:flex-row md:items-center flex-1">
          {search_inputs.map((input) => {
            const {
              icon,
              id,
              placeholder,
              onChangeFunc,
              filterType,
              categoryValues,
              categoryValue,
              filterFn,
            } = input;

            if (filterType === "input_search")
              return (
                <ProviderSearchInput
                  key={id}
                  icon={icon}
                  placeholder={placeholder}
                  onChangeFunc={onChangeFunc}
                  className="flex-1"
                />
              );
            else if (filterType === "select one")
              return (
                <FilterSelect
                  key={id}
                  options={categoryValues}
                  categoryValue={categoryValue}
                  updateCategoryValue={filterFn}
                  icon={icon}
                  className="flex-1"
                />
              );
          })}
        </div>

        <Button className="flex items-center gap-2 sm:max-w-36" onClickFn={handleSearch}>
          <IoMdSearch className="text-xl" />
          <span>Search</span>
        </Button>
      </div>
    </div>
  );
}
