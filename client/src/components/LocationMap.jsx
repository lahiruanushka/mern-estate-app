import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const LocationMap = ({ listing }) => {
  return (
    <div className="w-full h-[200px] md:h-[400px] z-10 overflow-hidden mt-8 md:mt-3 md:ml-2">
      {(() => {
        // Parse the geolocation array
        const [lat, lng] = Array.isArray(listing.geolocation)
          ? listing.geolocation
          : listing.geolocation.split(",").map(parseFloat);

        // Check if coordinates are valid
        if (lat && lng) {
          return (
            <MapContainer
              center={[lat, lng]}
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full rounded-box shadow-md"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, lng]}>
                <Popup>{listing.address || "Property Location"}</Popup>
              </Marker>
            </MapContainer>
          );
        }

        // Fallback if coordinates are invalid
        return (
          <div role="alert" className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Location information not available</span>
          </div>
        );
      })()}
    </div>
  );
};

export default LocationMap;
