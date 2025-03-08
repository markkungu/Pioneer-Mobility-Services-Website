import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoadScript, GoogleMap, Autocomplete, Marker } from "@react-google-maps/api";

const libraries = ["places"];

export default function Booking() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAePhvWbc6DrGM2bpD0S0QYXhroZaf0DGo",
    libraries,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service || { title: "Booking", base_price: 0 };

  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    date: "",
    time: "",
    serviceTitle: service.title, // Store service title
  });

  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [price, setPrice] = useState(0);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const calculateDistance = (event) => {
    event.preventDefault();
    const { origin, destination } = formData;
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
          const route = result.routes[0].legs[0];
          setDistance(route.distance.text);
          setDuration(route.duration.text);

          setOriginCoords(route.start_location);
          setDestinationCoords(route.end_location);

          // Calculate price based on distance (assuming per km rate of 10)
          const km = parseFloat(route.distance.text.replace(" km", ""));
          const totalPrice = service.base_price + km * 10;
          setPrice(totalPrice);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const bookingData = {
      ...formData,
      distance,
      duration,
      price,
    };
    console.log(bookingData);
    navigate("/payment", { state: { bookingData } });
    
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

        <button type="button" onClick={calculateDistance} className="bg-blue-500 text-white p-2 rounded-lg">
          Calculate Distance
        </button>

        {distance && duration && (
          <p className="text-lg font-semibold">
            Distance: {distance} | Estimated Time: {duration}
          </p>
        )}

        {price > 0 && (
          <p className="text-lg font-semibold text-green-600">Total Price: ${price.toFixed(2)}</p>
        )}

        <input type="date" id="date" value={formData.date} onChange={handleChange} className="p-2 border rounded-lg" />

        <input type="time" id="time" value={formData.time} onChange={handleChange} className="p-2 border rounded-lg" />

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
