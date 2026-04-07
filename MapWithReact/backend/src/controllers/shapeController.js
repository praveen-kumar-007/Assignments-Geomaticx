const {
  createShape,
  getAllShapes,
  deleteShapeById,
} = require("../services/shapeService");

function isValidShape(payload) {
  if (!payload || !payload.shapeType || !Array.isArray(payload.coordinates)) {
    return false;
  }

  const allowedTypes = ["polyline", "polygon"];
  return allowedTypes.includes(payload.shapeType);
}

async function createShapeHandler(req, res, next) {
  try {
    if (!isValidShape(req.body)) {
      return res.status(400).json({ message: "Invalid shape payload" });
    }

    const inserted = await createShape(req.body);
    return res.status(201).json({ message: "Shape saved", id: inserted.id });
  } catch (error) {
    return next(error);
  }
}

async function listShapesHandler(req, res, next) {
  try {
    const shapes = await getAllShapes();
    return res.json(shapes);
  } catch (error) {
    return next(error);
  }
}

async function deleteShapeHandler(req, res, next) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid shape id" });
    }

    const deleted = await deleteShapeById(id);

    if (!deleted) {
      return res.status(404).json({ message: "Shape not found" });
    }

    return res.json({ message: "Shape deleted" });
  } catch (error) {
    return next(error);
  }
}

module.exports = { createShapeHandler, listShapesHandler, deleteShapeHandler };
