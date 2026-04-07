# Backend (SQLite)

## Setup

1. Open terminal in backend folder.
2. Run `npm install`.
3. Run `npm run dev`.

Server runs at `http://localhost:5000`.

## API

- `GET /api/health`
- `POST /api/shapes`
- `GET /api/shapes`

### POST /api/shapes body

```json
{
  "shapeType": "polyline",
  "roadName": "Road 1",
  "landmark": "Near Park",
  "distanceMeters": 100.25,
  "areaMeters": 0,
  "coordinates": [{ "lat": 23.79, "lng": 86.43 }]
}
```
