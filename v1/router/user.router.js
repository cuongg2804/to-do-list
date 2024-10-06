const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const registerValitdate = require("../../validate/resgister.validate");

router.post("/register",registerValitdate,controller.register);

module.exports = router;