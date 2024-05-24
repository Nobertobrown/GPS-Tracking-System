import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    contextmenu() {
      map.locate({ enableHighAccuracy: true, watch: true });
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 18);
      // console.log(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position} autoPanOnFocus>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function Map() {
  return (
    <MapContainer
      center={{ lat: -6.369, lng: 34.8888 }}
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

// LatLng{lat: -6.8131558, lng: 39.2803661} blk 4
