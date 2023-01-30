const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitals.controllers");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

//GET
router.get("/", getHospitals);

//POST
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  createHospital
);

//PUT
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  updateHospital
);

// DELETE
router.delete("/:id", validateJWT, deleteHospital);

module.exports = router;
