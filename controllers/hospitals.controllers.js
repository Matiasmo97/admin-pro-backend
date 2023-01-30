const { response } = require("express");

const Hospital = require("../models/hospital.model");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate("user", "name img");

  res.status(200).json({
    ok: true,
    hospitals,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ user: uid, ...req.body });

  try {
    const hospitalDB = await hospital.save();
    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const updateHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital not found by id",
        id,
      });
    }

    const changesHospital = {
      ...req.body,
      user: uid,
    };

    const updatedHospital = await Hospital.findByIdAndUpdate(
      id,
      changesHospital,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      hospital: updatedHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital not found by id",
        id,
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Hospital deteled",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
