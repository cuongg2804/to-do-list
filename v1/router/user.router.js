const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");
const userValitdate = require("../../validate/user.validate");
const requireAuth = require("../../middlewares/requireAuth.middlewares");

// POST /v1/api/user/register
router.post("/register",userValitdate.register,controller.register);

// POST /v1/api/user/login

router.post("/login",userValitdate.login,controller.login);

// POST /v1/api/user/password/forgot

router.post("/password/forgot", userValitdate.forgot,controller.forgot);

// POST /v1/api/user/password/otp

router.post("/password/otp", controller.otp);

// POST /v1/api/user/password/reset

router.post("/password/reset", controller.reset);

// GET /v1/api/user/detail/:id

router.get("/detail",requireAuth, controller.detail);

module.exports = router;