import { useState } from "react";
import Map from "./components/Map";
import "./App.css";

function App() {
  const [realTimePosition, setRealTimePosition] = useState({
    lng: "",
    lat: "",
  });

  let currentPosition = {lng: "", lat: ""};

  function success(pos) {
    setRealTimePosition({
      lng: pos.coords.longitude,
      lat: pos.coords.latitude,
    });
  }

  function currentSuccess(pos) {
    currentPosition.lat = pos.coords.latitude;
    currentPosition.lng = pos.coords.longitude;
  }

  function failure(error) {
    alert(`ERROR(${error.code}): ${error.message}`);
  }

  const options = {
    enableHighAccuracy: true,
    // maximumAge: 30000,
    // timeout: 27000,
  };

  navigator.geolocation.getCurrentPosition(currentSuccess, failure, options);
  navigator.geolocation.watchPosition(success, failure, options);

  return (
    <section>
      <Map currentPos={currentPosition} realPos={realTimePosition} />
    </section>
  );
}

export default App;
