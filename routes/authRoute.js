// --------------------------------------------------------------------------------
const router = require('express').Router();
const { userRegister } = require('../controller/authController')


router.post('/', userRegister);

module.exports = router;
