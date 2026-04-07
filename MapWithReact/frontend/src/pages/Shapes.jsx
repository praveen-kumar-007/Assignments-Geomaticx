import { useEffect, useState } from "react";
import { Polygon, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import MapLoad from "./mapLoad";
import ShapeForm from "./ShapeForm";
import { createShape, deleteShape, getShapes } from "../services/shapeApi";

function getDistanceMeters(latlngs) {
  let total = 0;
  for (let i = 0; i < latlngs.length - 1; i += 1) {
    total += latlngs[i].distanceTo(latlngs[i + 1]);
  }
  return total;
}

function DrawControls({ onShapeCreated }) {
  const map = useMap();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
      draw: {
        polyline: true,
        polygon: true,
        rectangle: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
    });

    map.addControl(drawControl);

    const handleCreated = (e) => {
      drawnItems.addLayer(e.layer);

      const shapeType = e.layerType;
      const isPolygon = shapeType === "polygon";
      const rawLatLngs = e.layer.getLatLngs();
      const latlngs = isPolygon ? rawLatLngs[0] : rawLatLngs;

      const distanceMeters = isPolygon ? 0 : getDistanceMeters(latlngs);
      const areaMeters = isPolygon
        ? L.GeometryUtil?.geodesicArea?.(latlngs) || 0
        : 0;

      const coordinates = latlngs.map((point) => ({
        lat: Number(point.lat.toFixed(6)),
        lng: Number(point.lng.toFixed(6)),
      }));

      onShapeCreated({
        shapeType,
        coordinates,
        distanceMeters: Number(distanceMeters.toFixed(2)),
        areaMeters: Number(areaMeters.toFixed(2)),
      });
    };

    map.on(L.Draw.Event.CREATED, handleCreated);

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated);
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
    };
  }, [map, onShapeCreated]);

  return null;
}

function SavedShapesLayer({ shapes }) {
  return (
    <>
      {shapes.map((shape) => {
        const positions = (shape.coordinates || []).map((point) => [
          Number(point.lat),
          Number(point.lng),
        ]);

        if (positions.length === 0) {
          return null;
        }

        if (shape.shapeType === "polygon") {
          return (
            <Polygon
              key={`saved-polygon-${shape.id}`}
              positions={positions}
              pathOptions={{ color: "#1f6feb", weight: 3, fillOpacity: 0.2 }}
            />
          );
        }

        return (
          <Polyline
            key={`saved-polyline-${shape.id}`}
            positions={positions}
            pathOptions={{ color: "#16a34a", weight: 4 }}
          />
        );
      })}
    </>
  );
}

function Shapes() {
  const [shapeData, setShapeData] = useState(null);
  const [savedShapes, setSavedShapes] = useState([]);
  const [viewShape, setViewShape] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadShapes() {
      try {
        const shapes = await getShapes();
        if (isMounted) {
          setSavedShapes(Array.isArray(shapes) ? shapes : []);
        }
      } catch (error) {
        if (isMounted) {
          setMessage(error.message || "Failed to load saved shapes");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadShapes();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSave = async (payload) => {
    setSubmitting(true);
    setMessage("");

    try {
      const saved = await createShape(payload);
      const refreshedShapes = await getShapes();
      setSavedShapes(Array.isArray(refreshedShapes) ? refreshedShapes : []);
      setShapeData(null);
      setMessage(saved.message || "Shape saved successfully");
    } catch (error) {
      setMessage(error.message || "Failed to save shape");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setMessage("");

    try {
      const deleted = await deleteShape(id);
      setSavedShapes((previousShapes) =>
        previousShapes.filter((shape) => shape.id !== id),
      );
      setViewShape((current) => (current?.id === id ? null : current));
      setMessage(deleted.message || "Shape deleted successfully");
    } catch (error) {
      setMessage(error.message || "Failed to delete shape");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="map-with-form">
      <MapLoad>
        <DrawControls onShapeCreated={setShapeData} />
        <SavedShapesLayer shapes={savedShapes} />
      </MapLoad>

      <div className="map-right-panels">
        {shapeData && (
          <div className="map-form-panel">
            <h3>Shape Form</h3>
            <ShapeForm
              shapeData={shapeData}
              onSubmit={handleSave}
              isSubmitting={submitting}
              onCancel={() => setShapeData(null)}
            />
          </div>
        )}

        <div className="map-form-panel">
          <h3>Saved Shapes</h3>
          {message && <p>{message}</p>}
          {loading && <p>Loading shapes...</p>}
          {!loading && savedShapes.length === 0 && <p>No saved shapes yet.</p>}
          {!loading && savedShapes.length > 0 && (
            <ul className="saved-shapes-list">
              {savedShapes.map((shape) => (
                <li key={shape.id} className="saved-shape-item">
                  <strong>{shape.shapeType}</strong>
                  <span>{shape.roadName || "No road"}</span>
                  <span>{shape.landmark || "No landmark"}</span>
                  <div className="saved-shape-actions">
                    <button type="button" onClick={() => setViewShape(shape)}>
                      View
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(shape.id)}
                      disabled={deletingId === shape.id}
                    >
                      {deletingId === shape.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {viewShape && (
        <div className="map-details-panel">
          <h3>Shape Details</h3>
          <div className="shape-details-grid">
            <p>
              <strong>ID:</strong> {viewShape.id}
            </p>
            <p>
              <strong>Type:</strong> {viewShape.shapeType}
            </p>
            <p>
              <strong>Road:</strong> {viewShape.roadName || "-"}
            </p>
            <p>
              <strong>Landmark:</strong> {viewShape.landmark || "-"}
            </p>
            <p>
              <strong>Distance (m):</strong> {viewShape.distanceMeters}
            </p>
            <p>
              <strong>Area (sq.m):</strong> {viewShape.areaMeters}
            </p>
            <p>
              <strong>Created:</strong> {viewShape.createdAt || "-"}
            </p>
            <p>
              <strong>Coordinates:</strong>
            </p>
            <textarea
              readOnly
              rows={6}
              value={(viewShape.coordinates || [])
                .map(
                  (point, index) => `${index + 1}. ${point.lat}, ${point.lng}`,
                )
                .join("\n")}
            />
            <button type="button" onClick={() => setViewShape(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shapes;
