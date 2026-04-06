const validateRegistration = (req, res, next) => {
  const { first_name, last_name, email, password, age, school_name, gender } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !age ||
    !school_name ||
    !gender
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (typeof age !== "number" && typeof age !== "string") {
    return res.status(400).json({ error: "Age must be a number" });
  }

  if (+age < 1 || +age > 150) {
    return res.status(400).json({ error: "Age must be between 1 and 150" });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  next();
};

const validateUpdate = (req, res, next) => {
  const { first_name, last_name, password, age, school_name, gender } =
    req.body;

  if (
    !first_name ||
    !last_name ||
    !password ||
    !age ||
    !school_name ||
    !gender
  ) {
    return res
      .status(400)
      .json({ error: "All fields are required for update" });
  }

  if (typeof age !== "number" && typeof age !== "string") {
    return res.status(400).json({ error: "Age must be a number" });
  }

  if (+age < 1 || +age > 150) {
    return res.status(400).json({ error: "Age must be between 1 and 150" });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateUpdate,
};
