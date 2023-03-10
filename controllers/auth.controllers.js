const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { findById } = require("../models/user.model");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const userDB = await User.findOne({ email });

    // Validate email
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Invalid password or email",
      });
    }

    // Validate password
    const validatePassword = bcryptjs.compareSync(password, userDB.password);
    if (!validatePassword) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid password or email",
      });
    }

    // Generate TOKEN - JWT
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
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

const googleSignIn = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const userDB = await User.findOne({ email });
    let user;

    if (!userDB) {
      user = new User({
        name,
        email,
        img: picture,
        password: "@@@",
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    // Save user
    await user.save();

    // Generate TOKEN - JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      email,
      name,
      picture,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Google token is not correct",
    });
  }
};

const renewToken = async (req, res = response) => {

  const uid = req.uid

  // Generate TOKEN - JWT
  const token = await generateJWT(uid);

  const user = await User.findById(uid)

  res.json({
    ok: true,
    token,
    user
  });

} 

module.exports = {
  login,
  googleSignIn,
  renewToken
};
