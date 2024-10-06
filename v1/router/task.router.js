const express = require("express");
const router = express.Router();
const validateCreate = require("../../validate/create.validate");
const controller = require("../controller/task.controller");

router.get("/task", controller.index);

// GET /detail/:id

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

// POST /v1/api/task/create

router.post("/create", validateCreate,controller.createPost);

// PATCH /v1/api/task/edit/:id

router.patch("/edit/:id", controller.edit);

// PATCH /v1/api/task/edit-multi

router.patch("/edit-multi", controller.editMulti);

// [PATCH] /v1/api/task/delete/:id

router.patch("/delete/:id", controller.delete);

// PATCH /v1/api/task/delete-multi

router.patch("/delete-multi", controller.deleteMulti);




module.exports = router;