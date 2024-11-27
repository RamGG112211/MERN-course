/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../global/Button";

export default function DoctorCard({ doctor, className }) {
  const {
    clinicAddress,
    experienceYears,
    qualification,
    specialization,
    user_id,
  } = doctor;
  const profile = doctor?.profileImage;

  return (
    <div className={`mb-4 ${className}`}>
      <div className=" m-2 bg-white rounded-lg shadow-lg">
        <div className="flex items-center p-4">
          <img
            className="w-24 h-24 rounded-full object-cover"
            src={profile ? `http://localhost:3000${profile}` : "img"}
            alt={name}
          />
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{user_id?.fullName}</h3>
            <p className="text-gray-500">{specialization}</p>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          {/* <p className="text-gray-600">Location: {location}</p> */}
        </div>
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <div>
            {/* <p className="text-gray-700">Rating: {rating} / 5</p> */}
          </div>
          {/* <p className="text-green-600 font-semibold">Fee: {consultationFee}</p> */}
        </div>

        <div className=" p-4 pt-0">
          <Link to={`/booking/${doctor._id}`} className="">
            <Button>Book appointment</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
