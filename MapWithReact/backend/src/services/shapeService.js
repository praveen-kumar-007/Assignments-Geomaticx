const { getDb } = require("../config/db");

async function createShape(shape) {
  const db = getDb();

  const result = await db.run(
    `
      INSERT INTO shapes (
        shape_type,
        road_name,
        landmark,
        distance_meters,
        area_meters,
        coordinates_json
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      shape.shapeType,
      shape.roadName || "",
      shape.landmark || "",
      Number(shape.distanceMeters) || 0,
      Number(shape.areaMeters) || 0,
      JSON.stringify(shape.coordinates || []),
    ],
  );

  return { id: result.lastID };
}

async function getAllShapes() {
  const db = getDb();
  const rows = await db.all("SELECT * FROM shapes ORDER BY id DESC");

  return rows.map((row) => ({
    id: row.id,
    shapeType: row.shape_type,
    roadName: row.road_name,
    landmark: row.landmark,
    distanceMeters: row.distance_meters,
    areaMeters: row.area_meters,
    coordinates: JSON.parse(row.coordinates_json || "[]"),
    createdAt: row.created_at,
  }));
}

async function deleteShapeById(id) {
  const db = getDb();
  const result = await db.run("DELETE FROM shapes WHERE id = ?", [id]);
  return result.changes > 0;
}

module.exports = { createShape, getAllShapes, deleteShapeById };
