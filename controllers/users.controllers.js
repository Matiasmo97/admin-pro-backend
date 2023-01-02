const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const users = await User.find();

  res.json({
    ok: true,
    users,
    uid: req.uid,
  });
};

const postUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email allready exists",
      });
    }

    const user = new User(req.body);

    // Encrypt password
    const encrypt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, encrypt);

    // Save user
    await user.save();

    // Generate TOKEN - JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const updateUsers = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.json({
        ok: false,
        msg: "There is no user with is id",
      });
    }

    // Updates
    const { password, google, email, ...fields } = req.body;

    if (userDB.email !== email) {
      const existsEmail = await User.findOne({ email });
      if (existsEmail) {
        return res.status(400).json({
          ok: false,
          msg: "There is already a user with that email",
        });
      }
    }

    fields.email = email;
    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });
    res.status(200).json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

const deleteUsers = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.json({
        ok: false,
        msg: "The user does not exist",
      });
    }

    await User.findByIdAndDelete(uid);

    res.status(200).json({
      ok: true,
      msg: "User deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

module.exports = {
  getUsers,
  postUser,
  updateUsers,
  deleteUsers,
};
