function sendSuccess(res, data) {
  res.status(200).json(data);
}

function sendError(res, status, error) {
  res.status(status).json({ error });
}

module.exports = {
  sendSuccess,
  sendError,
};
