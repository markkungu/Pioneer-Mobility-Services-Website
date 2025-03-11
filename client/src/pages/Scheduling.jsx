import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoadScript, GoogleMap, Autocomplete, Marker } from "@react-google-maps/api";

const libraries = ["places"];

export default function Booking() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  console.log("API Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service || { title: "Booking", base_price: 0 };

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    service: {
      id: service.id,
      name: service.title,
      base_price: service.base_price,
    },
    distance: "",
    duration: "",
    total_price: "",
  });

  const [map, setMap] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

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
                setFormData((prev) => ({ ...prev, origin: results[0].formatted_address }));
                setOriginCoords(latLng);
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

  useEffect(() => {
    if (formData.origin && formData.destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: formData.origin,
          destination: formData.destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            const route = result.routes[0].legs[0];
            const km = parseFloat(route.distance.text.replace(" km", ""));
            const totalPrice = service.base_price + km * 10;

            setFormData((prev) => ({
              ...prev,
              distance: route.distance.text,
              duration: route.duration.text,
              total_price: totalPrice.toFixed(2),
            }));

            setOriginCoords(route.start_location);
            setDestinationCoords(route.end_location);
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    }
  }, [formData.origin, formData.destination, service.base_price]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.date || !formData.time || !formData.origin || !formData.destination) {
      alert("Please fill in all required fields.");
      return;
    }
    navigate("/payment", { state: formData });
3
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <form className="grid md:grid-cols-3 gap-4 p-4" onSubmit={handleSubmit}>
      {/* Input Section */}
      <div className="flex flex-col gap-4 md:col-span-1">
        <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>

        <Autocomplete
          onLoad={(autocomplete) =>
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();
              if (place && place.geometry) {
                setFormData((prev) => ({ ...prev, origin: place.formatted_address }));
                setOriginCoords({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                });
              }
            })
          }
        >
          <input
            type="text"
            id="origin"
            value={formData.origin}
            onChange={handleChange}
            placeholder="Current location"
            className="p-2 border rounded-lg"
          />
        </Autocomplete>

        <Autocomplete
          onLoad={(autocomplete) =>
            autocomplete.addListener("place_changed", () => {
              const place = autocomplete.getPlace();
              if (place && place.geometry) {
                setFormData((prev) => ({ ...prev, destination: place.formatted_address }));
                setDestinationCoords({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                });
              }
            })
          }
        >
          <input
            type="text"
            id="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Destination"
            className="p-2 border rounded-lg"
          />
        </Autocomplete>

        {/* Automatically Display Distance, Duration & Price */}
        {formData.distance && formData.duration && (
          <p className="text-lg font-semibold">
            Distance: {formData.distance} | Estimated Time: {formData.duration}
          </p>
        )}

        {formData.total_price && (
          <p className="text-lg font-semibold text-green-600">Total Price: ${formData.total_price}</p>
        )}

        <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border rounded-lg" required />

        <input type="time" id="time" value={formData.time} onChange={handleChange} className="p-2 border rounded-lg" required />

        <button type="submit" className="bg-[#128178] text-white p-2 rounded-lg">
          Proceed to Payment
        </button>
      </div>

      {/* Map Section */}
      <div className="md:col-span-2">
        <GoogleMap mapContainerStyle={{ width: "100%", height: "400px" }} center={{ lat: -1.286389, lng: 36.817223 }} zoom={10} onLoad={(mapInstance) => setMap(mapInstance)}>
          {originCoords && <Marker position={originCoords} label="A" />}
          {destinationCoords && <Marker position={destinationCoords} label="B" />}
        </GoogleMap>
      </div>
    </form>
  );
}
