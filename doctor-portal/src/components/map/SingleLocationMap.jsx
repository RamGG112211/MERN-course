import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const SingleLocationMap = () => {
  const location = [27.7172, 85.324]; // Example: Kathmandu, Nepal

  return (
    <MapContainer
      center={location}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={location}>
        <Popup>Location: Kathmandu</Popup>
      </Marker>
    </MapContainer>
  );
};

export default SingleLocationMap;
