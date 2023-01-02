const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.model");
const { generateJWT } = require("../helpers/jwt");

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
      token
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
  login,
};