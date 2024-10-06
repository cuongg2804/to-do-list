const taskRouter = require("./task.router");

module.exports = (app) =>{
    const version = "/v1";

    app.use(version + "/api/task",taskRouter);
}