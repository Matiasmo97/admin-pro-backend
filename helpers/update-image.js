const fs = require("fs");
const User = require("../models/user.model");
const Doctor = require("../models/doctors.model");
const Hospital = require("../models/hospital.model");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    // Delete img old
    fs.unlinkSync(path);
  }
};

const updateImage = async (type, id, fileName) => {
  switch (type) {
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log("There is no doctor");
        return false;
      }
      const pathOldDoctors = `./uploads/doctors/${doctor.img}`;
      deleteImage(pathOldDoctors);

      doctor.img = fileName;
      await doctor.save();
      return true;
      break;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("There is no hospital");
        return false;
      }
      const pathOldHospital = `./uploads/hospitals/${hospital.img}`;
      deleteImage(pathOldHospital);

      hospital.img = fileName;
      await hospital.save();
      return true;
      break;
    case "users":
      const user = await User.findById(id);
      if (!user) {
        console.log("There is no user");
        return false;
      }
      const pathOldUser = `./uploads/users/${user.img}`;
      deleteImage(pathOldUser);

      user.img = fileName;
      await user.save();
      return true;
      break;
    default:
      break;
  }
};

module.exports = {
  updateImage,
};
