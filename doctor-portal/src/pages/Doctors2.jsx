import { useEffect, useState } from "react";
import AddDoctorModal from "../components/doctors/AddDoctorDialog";
import DoctorCard2 from "../components/doctors/DoctorCard2";
import Wrapper from "../components/global/Wrapper";
import { doctors_data } from "../utils/data";

export default function Doctors2() {
  // const [doctors, setDoctors] = useState(doctors_data);

  // // Function to add a new doctor
  // const handleAddDoctor = (newDoctor) => {
  //   setDoctors((prevDoctors) => [
  //     ...prevDoctors,
  //     { ...newDoctor, id: prevDoctors.length + 1 },
  //   ]);
  // };

  // // Function to delete a doctor
  // const handleDelete = (id) => {
  //   setDoctors((prevDoctors) =>
  //     prevDoctors.filter((doctor) => doctor.id !== id)
  //   );
  // };

  // // Function to update a doctor
  // const handleUpdate = (updatedDoctor) => {
  //   setDoctors((prevDoctors) =>
  //     prevDoctors.map((doctor) =>
  //       doctor.id === updatedDoctor.id ? updatedDoctor : doctor
  //     )
  //   );
  // };
  // useEffect(() => {
  //   console.log("doctors: ", doctors);
  // }, [doctors]);

  {
    /* <AddDoctorModal onAddDoctor={handleAddDoctor} />
     */
  }

  const [doctors, setDoctors] = useState(doctors_data);

  const handleAddDoctor = (newDoctor) => {
    // example newDoctor = {name: "value name", img_url: "/images/alkdjfl.jpg"}
    const duplicateNewDoctor = { ...newDoctor, id: doctors.length + 1 };
    setDoctors([...doctors, duplicateNewDoctor]);
  };

  const handleUpdateDoctor = (updatedDoctor) => {
    // updatedDoctor = {id: 1, name: "kjdfalj", image: "/image/"}
    // const doctor = doctors.find((doctor) => doctor.id == updatedDoctor.id);
    setDoctors((prevDoctors) => {
      return prevDoctors.map((doctor) =>
        doctor.id == updatedDoctor.id ? updatedDoctor : doctor
      );
    });
  };

  const handleDeleteDoctor = (doctorId) => {
    setDoctors((prevDoctors) => {
      return prevDoctors.filter((doctor) => doctor.id !== doctorId);
    });
  };

  return (
    <div>
      <AddDoctorModal handleAddDoctor={handleAddDoctor} />

      <div className="flex flex-wrap gap-4 lg:gap-5">
        {doctors.map((doctor) => (
          <DoctorCard2
            doctor={doctor}
            key={doctor.id}
            className="w-full sm:w-[calc(50%_-_8px)] lg:w-[calc((100%_/_3)_-_(40px_/_3))] xl:w-[calc(25%_-_20px)]"
            handleDeleteDoctor={handleDeleteDoctor}
            handleUpdateDoctor={handleUpdateDoctor}
          />
        ))}
      </div>
    </div>
  );
}
