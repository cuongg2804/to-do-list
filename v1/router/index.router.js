const taskRouter = require("./task.router");
const userRouter = require("./user.router");
module.exports = (app) =>{
    const version = "/v1/api";

    app.use(version + "/task",taskRouter);

    app.use(version + "/user",userRouter);
}