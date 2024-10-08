import React from "react";
import DoctorCard from "./DoctorCard";
import { doctors_data } from "../utils/data";

export default function DoctorsList() {
  return (
    <div className=" flex flex-wrap gap-4">
      {doctors_data.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}
