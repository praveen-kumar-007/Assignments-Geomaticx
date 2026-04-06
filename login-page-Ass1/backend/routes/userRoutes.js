const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  validateRegistration,
  validateLogin,
  validateUpdate,
} = require("../middleware/validate");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/user/:email", authenticate, getUser);
router.put("/user/:email", authenticate, validateUpdate, updateUser);
router.delete("/user/:email", authenticate, deleteUser);

module.exports = router;
