const { Router } = require("express");
const { check } = require("express-validator");
const {
  login,
  googleSignIn,
  renewToken,
} = require("../controllers/auth.controllers");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [check("token", "Token is required").not().isEmpty(), validateFields],
  googleSignIn
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
