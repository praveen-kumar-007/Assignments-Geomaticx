const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const { sendSuccess, sendError } = require("../utils/response");

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
};

const registerUser = (req, res) => {
  userService.registerUser(req.body, (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return sendError(res, 409, "Email already registered");
      }
      return sendError(res, 500, "Database error");
    }
    const token = createToken({ email: req.body.email });
    sendSuccess(res, {
      message: "Registration successful",
      userId: results.insertId,
      token,
    });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  userService.loginUser(email, password, (err, user) => {
    if (err) return sendError(res, 500, "Database error");
    if (user === null || user === false)
      return sendError(res, 401, "Invalid credentials");

    const { password: _, ...userData } = user;
    const token = createToken({ email: user.email });
    sendSuccess(res, { message: "Login successful", user: userData, token });
  });
};

const getUser = (req, res) => {
  const { email } = req.params;
  if (!req.user || req.user.email !== email)
    return sendError(res, 403, "Forbidden");

  userService.getUser(email, (err, user) => {
    if (err) return sendError(res, 500, "Database error");
    if (!user) return sendError(res, 404, "User not found");
    const { password, ...userData } = user;
    sendSuccess(res, userData);
  });
};

const updateUser = (req, res) => {
  const { email } = req.params;
  if (!req.user || req.user.email !== email)
    return sendError(res, 403, "Forbidden");

  userService.updateUser(email, req.body, (err, results) => {
    if (err) return sendError(res, 500, "Database error");
    if (results.affectedRows === 0)
      return sendError(res, 404, "User not found");
    sendSuccess(res, { message: "User updated successfully" });
  });
};

const deleteUser = (req, res) => {
  const { email } = req.params;
  if (!req.user || req.user.email !== email)
    return sendError(res, 403, "Forbidden");

  userService.deleteUser(email, (err, results) => {
    if (err) return sendError(res, 500, "Database error");
    if (results.affectedRows === 0)
      return sendError(res, 404, "User not found");
    sendSuccess(res, { message: "User deleted successfully" });
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
