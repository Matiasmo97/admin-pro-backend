const { response } = require("express");

const Doctor = require("../models/doctors.model");

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find()
    .populate("user", "name img")
    .populate("hospital", "name img");

  res.status(200).json({
    ok: true,
    doctors,
  });
};

const createDoctors = async (req, res = response) => {
  const uid = req.uid;
  const doctor = new Doctor({ user: uid, ...req.body });

  try {
    const doctorDB = await doctor.save();
    res.json({
      ok: true,
      hospital: doctorDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const updateDoctors = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Doctor not found by id",
        id,
      });
    }

    const changesDoctor = {
      ...req.body,
      user: uid,
    };

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      changesDoctor,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      doctor: updatedDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
};

const deleteDoctors = async (req, res = response) => {
  const id = req.params.id;

  try {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({
        ok: false,
        msg: "Doctor not found by id",
        id,
      });
    }

    await Doctor.findByIdAndDelete(id);

    res.status(200).json({
      ok: true,
      msg: "Doctor deteled",
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
  getDoctors,
  createDoctors,
  updateDoctors,
  deleteDoctors,
};
