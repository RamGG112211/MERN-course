/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import CustomButton from "../global/CustomButton";

export default function DoctorCard({ doctor, className }) {
  const { name, image, location, speciality, rating, consultationFee, id } =
    doctor;

  return (
    <div className={`mb-4 ${className}`}>
      <div className=" m-2 bg-white rounded-lg shadow-lg">
        <div className="flex items-center p-4">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src={image}
            alt={name}
          />
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-500">{speciality}</p>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <p className="text-gray-600">Location: {location}</p>
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-gray-700">Rating: {rating} / 5</p>
          </div>
          <p className="text-green-600 font-semibold">Fee: {consultationFee}</p>
        </div>

        <Link to={`/booking/${id}`}>
          <CustomButton title={"Book appointment"} containerStyles={"m-4"} />
        </Link>
      </div>
    </div>
  );
}
