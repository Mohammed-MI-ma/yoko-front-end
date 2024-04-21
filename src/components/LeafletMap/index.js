import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for proper styling

function LeafletMap() {
  return (
    <MapContainer
      center={[33.9332, -6.9084]} // Latitude and longitude coordinates of Temara city center
      zoom={14}
      style={{ height: "75vh" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">YOKO</a> contributors'
      />
    </MapContainer>
  );
}

export default LeafletMap;
