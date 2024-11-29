import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const RoutingControl = ({ source, destination }) => {
  const map = useMap(); // Access the map instance

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(...source), L.latLng(...destination)],
    //   routeWhileDragging: true,
    //   show: false,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, source, destination]);

  return null;
};

const SourceToDestinationMap = () => {
  const source = [27.7172, 85.324]; // Kathmandu
  const destination = [27.6989, 85.3037]; // Lalitpur

  return (
    <MapContainer
      center={source}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <RoutingControl source={source} destination={destination} />
    </MapContainer>
  );
};

export default SourceToDestinationMap;
