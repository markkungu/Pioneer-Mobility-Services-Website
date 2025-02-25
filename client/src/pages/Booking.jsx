import React, { useState, useEffect } from "react";
import { useLoadScript, GoogleMap, Autocomplete, DirectionsService } from "@react-google-maps/api";

const libraries = ["places"];

export default function Booking() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAePhvWbc6DrGM2bpD0S0QYXhroZaf0DGo", // Use env variable
    libraries,
  });

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (isLoaded && map) {
      const geocoder = new window.google.maps.Geocoder();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            geocoder.geocode({ location: latLng }, (results, status) => {
              if (status === "OK" && results[0]) {
                setOrigin(results[0].formatted_address);
              } else {
                console.error(`Geocoder failed due to ${status}`);
              }
            });
          },
          () => console.error("Error getting current location")
        );
      }
    }
  }, [isLoaded, map]);

  const calculateDistance = () => {
    if (!origin || !destination) {
      console.error("Both origin and destination are required to calculate distance.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          const distance = result.routes[0].legs[0].distance.text;
          console.log("Distance:", distance);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-md gap-4 mb-4">
        <Autocomplete
          onLoad={(autocomplete) => (autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
              setOrigin(place.formatted_address);
            }
          }))}
        >
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Current location"
            className="flex-1 p-2 border rounded-lg"
          />
        </Autocomplete>
        <Autocomplete
          onLoad={(autocomplete) => (autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
              setDestination(place.formatted_address);
            }
          }))}
        >
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination"
            className="flex-1 p-2 border rounded-lg"
          />
        </Autocomplete>
      </div>
      <button
        onClick={calculateDistance}
        className="bg-blue-500 text-white p-2 rounded-lg"
      >
        Calculate Distance
      </button>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={{ lat: -1.286389, lng: 36.817223 }}
        zoom={10}
        onLoad={(mapInstance) => setMap(mapInstance)}
      />
    </div>
  );
}
