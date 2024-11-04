const taskRouter = require("./task.router");
const userRouter = require("./user.router");
const requireAuth = require("../../middlewares/requireAuth.middlewares");

module.exports = (app) =>{
    const version = "/v1/api";

    app.use(version + "/task",requireAuth,taskRouter);

    app.use(version + "/user",userRouter);
}