const express = require("express");
const app = express();
const database = require("./config/database");
const router = require("./v1/router/index.router");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cors = require('cors')
dotenv.config();

database.connect();
app.use(cors());
app.use(bodyParser.json());
router(app);

app.listen(process.env.PORT, ()=>{
    console.log("Đã kết nối tới cổng: 5000")
})