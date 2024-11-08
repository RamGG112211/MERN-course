/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";
// import axios from "axios";
import UpdateProductModal from "./UpdateDoctorDialog";

const DoctorCard2 = ({
  doctor,
  onDelete,
  handleUpdateDoctor,
  handleDeleteDoctor,
}) => {
  return (
    <div className="doctor-card p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className=" overflow-hidden">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </div>
      <div className="p-2">
        <h3 className="lg:text-lg font-bold">{doctor.name}</h3>

        <div className=" flex items-center justify-between">
          <Link
            to={`/doctor/${doctor._id}`}
            className="text-blue-500 mt-4 block border border-blue-500 w-fit p-2 rounded-md px-4 hover:bg-blue-500 hover:text-white duration-200 transition-all"
          >
            View Details
          </Link>

          <div className=" flex items-center gap-2">
            <UpdateProductModal
              doctor={doctor}
              handleUpdateDoctor={handleUpdateDoctor}
            />
            <DeleteButton onClick={() => handleDeleteDoctor(doctor.id)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard2;
