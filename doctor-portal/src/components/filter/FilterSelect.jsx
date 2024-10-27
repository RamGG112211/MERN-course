/* eslint-disable react/prop-types */
"use client";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { FaCaretDown, FaCheck } from "react-icons/fa6";
import {
  updateCityChosenDoctor,
  updateHospitalChosen,
  updateSpecialityChosen,
} from "../../store/doctorsSlice";

const FilterSelect = ({ options, icon, className, categoryType }) => {
  const dispatch = useDispatch();
  const { cityChosenDoctor, hospitalChosen, specialityChosen } = useSelector(
    (state) => state.doctors
  );

  // Determine the selected category based on the categoryType prop
  const categoryValue =
    categoryType === "city"
      ? cityChosenDoctor
      : categoryType === "hospital"
      ? hospitalChosen
      : specialityChosen;

  const [selected, setSelected] = useState(
    categoryValue
      ? options.find(
          (option) =>
            option.value.toString().toLowerCase() ===
            categoryValue.toString().toLowerCase()
        )
      : options[0]
  );

  useEffect(() => {
    setSelected(
      categoryValue
        ? options.find(
            (option) =>
              option.value.toString().toLowerCase() ===
              categoryValue.toString().toLowerCase()
          )
        : options[0]
    );
  }, [categoryValue, options]);

  const updateCategoryValueOnOptionSelection = useCallback(() => {
    if (selected && selected.pos && selected.pos === "first") {
      if (categoryType === "city") dispatch(updateCityChosenDoctor(""));
      if (categoryType === "hospital") dispatch(updateHospitalChosen(""));
      if (categoryType === "speciality") dispatch(updateSpecialityChosen(""));
    } else if (selected && !selected.pos) {
      if (categoryType === "city")
        dispatch(updateCityChosenDoctor(selected.value));
      if (categoryType === "hospital")
        dispatch(updateHospitalChosen(selected.value));
      if (categoryType === "speciality")
        dispatch(updateSpecialityChosen(selected.value));
    }
  }, [selected, dispatch, categoryType]);

  useEffect(() => {
    updateCategoryValueOnOptionSelection();
  }, [selected, updateCategoryValueOnOptionSelection]);

  return (
    <Listbox
      as={"div"}
      value={selected}
      onChange={setSelected}
      className={`relative w-full shrink-0 ${className}`}
    >
      <Listbox.Button
        className={`relative w-full cursor-pointer bg-text5/20 px-5 py-2 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-sm  rounded-md shadow-md ${
          selected?.pos === "first" ? " text-black/70" : "text-black"
        }`}
      >
        <p className="flex items-center gap-2 font-medium">
          <span className="self-center">{icon}</span>
          <span>{selected?.value}</span>
        </p>

        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center pr-2">
          <FaCaretDown className="h-5 w-5" aria-hidden="true" />
        </span>
      </Listbox.Button>
      <Transition
        as={Fragment}
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute top-[calc(100%_+_2px)] z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-md ring-1 ring-black/5 focus:outline-none text-sm">
          {options.map((option, optionIdx) => (
            <Listbox.Option
              key={optionIdx}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? "bg-primary/20 text-primary" : "text-gray-900"
                }`
              }
              value={option}
            >
              {({ selected }) => (
                <>
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option.value}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                      <FaCheck className="h-4 w-4" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
};

export default FilterSelect;
