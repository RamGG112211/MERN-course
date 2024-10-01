import React from "react";

export default function DoctorCard({ doctor }) {
  console.log("doctor id: ", doctor.id);

  const { id, name, image, location, speciality } = doctor;

  return (
    <div className=" p-4 shadow-md w-full sm:w-[calc(50%_-_8px)] md:w-[calc((100%_/_3)_-_(32px_/_3))] lg:w-[calc(25%_-_12px)]">
      <img
        src={image}
        alt={name}
        className=" h-[150px] object-center object-cover"
      />
      <div className=" flex flex-col gap-2 items-start ">
        <h3 className=" text-lg font-medium">{name}</h3>
        <span className=" bg-blue-100 p-2 px-4 text-sm rounded-xl text-blue-700 font-bold">
          {speciality}
        </span>
      </div>
    </div>
  );
}
