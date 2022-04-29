
// -------------------------------------

const router = require('express').Router();
const { userRegister } = require('../controller/registerController')


router.post('/', userRegister);

module.exports = router;

