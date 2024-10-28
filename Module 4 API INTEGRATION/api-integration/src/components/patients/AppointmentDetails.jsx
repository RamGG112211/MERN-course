/* eslint-disable react/prop-types */
import VideoCallButton from "./VideoCallButton";

const AppointmentDetails = ({ appointment }) => {
  return (
    <div className="appointment-details">
      <h2>Appointment with Dr. {appointment.doctorName}</h2>
      <p>Date: {new Date(appointment.appointmentDate).toLocaleString()}</p>
      <p>Status: {appointment.status}</p>

      {appointment.status === "Confirmed" && (
        <VideoCallButton
          doctorId={appointment.doctor_id}
          patientId={appointment.user_id}
        />
      )}
    </div>
  );
};

export default AppointmentDetails;
