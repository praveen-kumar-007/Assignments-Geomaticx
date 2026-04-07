import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../css/MapLoad.css";

const center = [23.79, 86.43];

function MapLoad({ children }) {
  return (
    <div className="map-wrapper">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </div>
  );
}

export default MapLoad;
