const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const userValitdate = require("../../validate/user.validate");

// POST /v1/api/user/login
router.post("/register",userValitdate.register,controller.register);

// POST /v1/api/user/login

router.post("/login",userValitdate.login,controller.login);

// POST /v1/api/user/password/forgot

router.post("/password/forgot", userValitdate.forgot,controller.forgot);

module.exports = router;