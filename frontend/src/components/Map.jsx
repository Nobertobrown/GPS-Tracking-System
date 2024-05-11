import { MapContainer, Marker, TileLayer } from "react-leaflet";

export default function Map({ realPos, currentPos }) {
  console.log("Current", currentPos);
  console.log("RealTime", realPos);
  return (
    <MapContainer
      center={[-6.8059136, 39.2265728]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-6.8059136, 39.2265728]} />
    </MapContainer>
  );
}
