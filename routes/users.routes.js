const { Router } = require("express");
const router = Router();
const {
  getUsers,
  postUser,
  updateUsers,
  deleteUsers,
} = require("../controllers/users.controllers");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

//GET
router.get("/", validateJWT, getUsers);

//POST
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    validateFields,
  ],
  postUser
);

//PUT
router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("role", "Role is required").not().isEmpty(),
    validateFields,
  ],
  updateUsers
);

// DELETE
router.delete("/:id", validateJWT, deleteUsers);

module.exports = router;
