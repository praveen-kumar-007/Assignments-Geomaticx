const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

const registerUser = async (user, callback) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userToStore = { ...user, password: hashedPassword };
    userModel.createUser(userToStore, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  } catch (error) {
    callback(error);
  }
};

const loginUser = (email, password, callback) => {
  userModel.findUserByEmail(email, async (err, results) => {
    if (err) return callback(err);
    if (!results || results.length === 0) return callback(null, null);

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return callback(null, false);

    callback(null, user);
  });
};

const getUser = (email, callback) => {
  userModel.findUserByEmail(email, (err, results) => {
    if (err) return callback(err);
    if (!results || results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

const updateUser = async (email, user, callback) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const userToStore = { ...user, password: hashedPassword };
    userModel.updateUserByEmail(email, userToStore, (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    });
  } catch (error) {
    callback(error);
  }
};

const deleteUser = (email, callback) => {
  userModel.deleteUserByEmail(email, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
