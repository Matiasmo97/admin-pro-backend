const { Router } = require("express");
const router = Router();

const { getAll, getCollection } = require("../controllers/search.controllers");
const { validateJWT } = require("../middlewares/validate-jwt");

//GET
router.get("/:search", validateJWT, getAll);

router.get("/collection/:table/:search", validateJWT, getCollection);

module.exports = router;
