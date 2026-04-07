const express = require("express");
const {
  createShapeHandler,
  listShapesHandler,
  deleteShapeHandler,
} = require("../controllers/shapeController");

const router = express.Router();

router.post("/", createShapeHandler);
router.get("/", listShapesHandler);
router.delete("/:id", deleteShapeHandler);

module.exports = router;
