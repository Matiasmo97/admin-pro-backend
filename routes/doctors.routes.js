const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const {
  createDoctors,
  getDoctors,
  updateDoctors,
  deleteDoctors,
} = require("../controllers/doctors.controllers");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

//GET
router.get("/", getDoctors);

//POST
router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("hospital", "The id must be valid").isMongoId(),
    validateFields,
  ],
  createDoctors
);

//PUT
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("hospital", "The id must be valid").isMongoId(),
    validateFields,
  ],
  updateDoctors
);

// DELETE
router.delete("/:id", validateJWT, deleteDoctors);

module.exports = router;
