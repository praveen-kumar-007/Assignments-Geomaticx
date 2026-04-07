function errorHandler(error, req, res, next) {
  // Keep response generic for production safety.
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
}

module.exports = { errorHandler };
