const pool = require("../db");

const createUser = (user, callback) => {
  const { first_name, last_name, email, password, age, school_name, gender } =
    user;
  const query = `INSERT INTO users (first_name, last_name, email, password, age, school_name, gender) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  pool.query(
    query,
    [first_name, last_name, email, password, age, school_name, gender],
    callback,
  );
};

const findUserByEmail = (email, callback) => {
  pool.query("SELECT * FROM users WHERE email = ?", [email], callback);
};

const updateUserByEmail = (email, user, callback) => {
  const { first_name, last_name, password, age, school_name, gender } = user;
  const query = `UPDATE users SET first_name = ?, last_name = ?, password = ?, age = ?, school_name = ?, gender = ? WHERE email = ?`;
  pool.query(
    query,
    [first_name, last_name, password, age, school_name, gender, email],
    callback,
  );
};

const deleteUserByEmail = (email, callback) => {
  pool.query("DELETE FROM users WHERE email = ?", [email], callback);
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUserByEmail,
  deleteUserByEmail,
};
