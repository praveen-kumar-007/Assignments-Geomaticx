const path = require("path");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

let db;

async function initDb() {
  if (db) {
    return db;
  }

  db = await open({
    filename: path.join(__dirname, "../../shapes.db"),
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS shapes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shape_type TEXT NOT NULL,
      road_name TEXT,
      landmark TEXT,
      distance_meters REAL DEFAULT 0,
      area_meters REAL DEFAULT 0,
      coordinates_json TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}

function getDb() {
  if (!db) {
    throw new Error("Database not initialized. Call initDb first.");
  }
  return db;
}

module.exports = { initDb, getDb };
