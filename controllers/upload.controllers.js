const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { reset } = require("nodemon");
const { v4: uuid4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const fileUpload = (req, res = reset) => {
  const type = req.params.type;
  const id = req.params.id;

  const typesValidates = ["hospitals", "doctors", "users"];

  if (!typesValidates.includes(type)) {
    return res.status(500).json({
      ok: false,
      msg: "Talk to the administrator",
    });
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No file were uploaded",
    });
  }

  // Validate Extension
  const file = req.files.image;
  const cutName = file.name.split(".");
  const fileExtension = cutName[cutName.length - 1];

  const extensions = ["png", "jpg", "jpeg", "gif"];
  if (!extensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      msg: "Not an allowed extension",
    });
  }

  //Generate file name
  const fileName = `${uuid4()}.${fileExtension}`;

  //Move image
  const path = `./uploads/${type}/${fileName}`;
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error moving image",
      });
    }

    //Update the database
    updateImage(type, id, fileName);

    res.status(200).json({
      ok: true,
      msg: "File uploaded!",
      fileName,
    });
  });
};

const returnImage = (req, res = response) => {
  const type = req.params.type;
  const image = req.params.image;

  const pathImg = path.join(__dirname, `../uploads/${type}/${image}`);

  // Image per default
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathNoImg = path.join(__dirname, `../uploads/image/no-image.png`);
    res.sendFile(pathNoImg);
  }
};

module.exports = {
  fileUpload,
  returnImage,
};
