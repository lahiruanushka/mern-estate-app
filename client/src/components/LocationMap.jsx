import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import mapIcon from "../assets/images/pin-maps-and-location-svgrepo-com.svg";

// Fix for default marker icon
const defaultIcon = icon({
  iconUrl: mapIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationMap = ({ listing }) => {
  useEffect(() => {
    // Import leaflet container styles
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  const [lat, lng] = Array.isArray(listing.geolocation)
    ? listing.geolocation
    : listing.geolocation?.split(",").map(parseFloat);

  if (!lat || !lng) {
    return (
      <div className="w-full h-[200px] md:h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center p-4 bg-yellow-100 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-6 w-6 text-yellow-600 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-sm text-gray-700">
            Location information not available
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[200px] md:h-[400px] relative overflow-hidden mt-8 md:mt-3 md:ml-2">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full rounded-lg shadow-md"
        style={{ background: "#f8f9fa" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={defaultIcon}>
          <Popup>
            {listing.address ||
              listing.name ||
              "Property Location"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
