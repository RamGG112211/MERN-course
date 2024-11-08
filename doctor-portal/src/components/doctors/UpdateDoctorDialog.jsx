/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { RxCross2 } from "react-icons/rx";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import UpdateButton from "./updateButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UpdateDoctorModal = ({ doctor, handleUpdateDoctor }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [updatedDoctor, setUpdatedDoctor] = useState({
    name: doctor.name,
    // price: doctor.price,
    image: doctor.image,
    // shortDescription: doctor.shortDescription,
    // fullDescription: doctor.fullDescription,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDoctor({
      ...updatedDoctor,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(updatedDoctor);
    e.preventDefault();
    handleUpdateDoctor({ ...updatedDoctor, id: doctor.id });
    setIsOpenModal(false);
    // try {
    //   const response = await axios.put(
    //     `http://localhost:5001/api/v1/updatedDoctors/${doctor._id}`,
    //     updatedDoctor,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   console.log(response.data); // Handle the response data as needed
    //   setIsOpenModal(false);
    //   setUpdatedDoctor({
    //     name: "",
    //     price: "",
    //     image: "",
    //     shortDescription: "",
    //     fullDescription: "",
    //   });
    // } catch (error) {
    //   console.error("There was an error posting the updatedDoctor!", error);
    // }
  };

  return (
    <div>
      <UpdateButton onClick={() => setIsOpenModal(true)} />
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
          <h3 className="text-xl font-medium mb-2">Add New updatedDoctor</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name*"
                value={updatedDoctor.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            {/* <div className="mb-4">
              <input
                type="number"
                name="price"
                placeholder="Price*"
                value={updatedDoctor.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div> */}
            <div className="mb-4">
              <input
                type="text"
                name="image"
                placeholder="Image URL*"
                value={updatedDoctor.image}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            {/* <div className="mb-4">
              <textarea
                name="shortDescription"
                placeholder="Short Description*"
                value={updatedDoctor.shortDescription}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                name="fullDescription"
                placeholder="Full Description*"
                value={updatedDoctor.fullDescription}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div> */}
            <div className="flex justify-end">
              <Button type="submit" variant="contained" color="primary">
                Update updatedDoctor
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

export default UpdateDoctorModal;
