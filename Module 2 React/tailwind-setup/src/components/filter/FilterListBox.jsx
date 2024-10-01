/* eslint-disable react/prop-types */
"use client";
import { Fragment } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

const FilterListBox = ({ item, updateFunc, options }) => {
  return (
    <div className="w-[8rem] md:w-[10rem]">
      <Listbox value={item} onChange={updateFunc}>
        <div className="relative mt-1">
          <ListboxButton
            className={
              "relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-secondary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary cursor-pointer"
            }
          >
            <span className="block truncate">{item}</span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FaChevronDown className="text-gray-500" aria-hidden="true" />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              {options.map((op, index) => (
                <ListboxOption
                  key={index}
                  value={op}
                  className="group flex  items-center gap-2 rounded-lg py-1.5 px-3 text-gray-900 select-none relative cursor-pointer data-[focus]:bg-primary/10 data-[focus]:text-primary "
                >
                  <FaCheck className="invisible size-4 text-transparent group-data-[selected]:visible group-data-[selected]:text-primary" />
                  <div className="text-sm/6 group-data-[selected]:text-primary">
                    {op}
                  </div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default FilterListBox;
