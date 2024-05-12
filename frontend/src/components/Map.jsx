import { MapContainer, Marker,Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate({enableHighAccuracy:true});
    },
    locationfound(e) {
      console.log(e.latlng)
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function Map() {
  return (
    <MapContainer
      center={{ lat: -6.3690, lng: 34.8888 }}
      zoom={6}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
