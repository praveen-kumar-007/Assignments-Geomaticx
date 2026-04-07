import { useState } from "react";

function ShapeForm({ shapeData, onSubmit, onCancel, isSubmitting = false }) {
  const [roadName, setRoadName] = useState("");
  const [landmark, setLandmark] = useState("");

  const coordinateText = (shapeData.coordinates || [])
    .map((point, index) => `${index + 1}. ${point.lat}, ${point.lng}`)
    .join("\n");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!roadName.trim() || !landmark.trim()) {
      return;
    }

    onSubmit({
      roadName,
      landmark,
      shapeType: shapeData.shapeType,
      distanceMeters: shapeData.distanceMeters,
      areaMeters: shapeData.areaMeters,
      coordinates: shapeData.coordinates,
    });
  };

  return (
    <form className="map-form" onSubmit={handleSubmit}>
      <label>
        Shape Type
        <input value={shapeData.shapeType} readOnly />
      </label>

      <label>
        Road Name
        <input
          value={roadName}
          onChange={(e) => setRoadName(e.target.value)}
          placeholder="Enter road name"
          disabled={isSubmitting}
          required
        />
      </label>

      <label>
        Landmark
        <input
          value={landmark}
          onChange={(e) => setLandmark(e.target.value)}
          placeholder="Enter landmark"
          disabled={isSubmitting}
          required
        />
      </label>

      {shapeData.shapeType === "polyline" && (
        <label>
          Distance (meters)
          <input value={shapeData.distanceMeters} readOnly />
        </label>
      )}

      {shapeData.shapeType === "polygon" && (
        <label>
          Area (sq. meters)
          <input value={shapeData.areaMeters} readOnly />
        </label>
      )}

      <label>
        Latitude / Longitude
        <textarea value={coordinateText} rows={6} readOnly />
      </label>

      <div className="map-form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ShapeForm;
