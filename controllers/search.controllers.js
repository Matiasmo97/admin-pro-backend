const { response } = require("express");

const User = require("../models/user.model");
const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospital.model");

const getAll = async (req, res = response) => {
  const search = req.params.search;
  const regex = new RegExp(search, "i");

  const [users, doctors, hospitals] = await Promise.all([
    User.find({ name: regex }),
    Doctor.find({ name: regex }),
    Hospital.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    msg: "getAll",
    search: {
      users,
      doctors,
      hospitals,
    },
  });
};

const getCollection = async (req, res = response) => {
  const table = req.params.table;
  const search = req.params.search;
  const regex = new RegExp(search, "i");

  let data = [];

  switch (table) {
    case "users":
      data = await User.find({ name: regex });
      break;
    case "doctors":
      data = await Doctor.find({ name: regex });
      break;
    case "hospitals":
      data = await Hospital.find({ name: regex });
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "The table does not exist",
      });
  }

  res.status(200).json({
    ok: true,
    result: data,
  });
};

module.exports = {
  getAll,
  getCollection,
};
