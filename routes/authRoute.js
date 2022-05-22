// -------------------------------------

const router = require("express").Router();
const { userLogin, userRegister } = require("../controller/userAuthController");

router.post("/register", userRegister);
router.post("/login", userLogin);

module.exports = router;
