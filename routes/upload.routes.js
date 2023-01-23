const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const router = Router();

const { fileUpload, returnImage } = require("../controllers/upload.controllers");
const { validateJWT } = require("../middlewares/validate-jwt");

router.use(expressFileUpload());

//PUT
router.put("/:type/:id", validateJWT, fileUpload);

// GET
router.get("/:type/:image", returnImage);

module.exports = router;
