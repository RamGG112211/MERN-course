import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { RxCross2 } from "react-icons/rx";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line react/prop-types
const AddDoctorModal = ({ handleAddDoctor }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [doctor, setDoctor] = useState({
    name: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // name= "name", value="Name something"

    // doctor ={name: "another name", image: "/images/doctor1.jpeg"}

    setDoctor({
      ...doctor,
      [name]: value,
    });

    //doctor = {name: "Name something"}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddDoctor(doctor); // Add new doctor using prop function
    setIsOpenModal(false);
    setDoctor({ name: "", image: "" }); // Reset form
  };

  return (
    <div>
      <Button onClick={() => setIsOpenModal(true)}>Add New Doctor</Button>
      <Dialog
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
      >
        <div
          className="absolute top-3 right-[2rem] text-2xl cursor-pointer"
          onClick={() => setIsOpenModal(false)}
        >
          <RxCross2 />
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <h3 className="text-xl font-medium mb-2">Add New Doctor</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Doctor Name*"
                value={doctor.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="image"
                placeholder="Image URL*"
                value={doctor.image}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="contained" color="primary">
                Add Doctor
              </Button>
              <Button
                onClick={() => setIsOpenModal(false)}
                variant="outlined"
                color="secondary"
                className="ml-2"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default AddDoctorModal;
