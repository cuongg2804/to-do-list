const User = require("../models/user.models");
const md5 = require("md5");
const generateRandomString = require("../../helper/generateRandom.helper");

module.exports.register = async (req, res) =>{
    const inforUser = {
        fullName:  req.body.fullName ,
        email: req.body.email,
        password:md5(req.body.password),
        tokenUser: generateRandomString(30),
    }

    const newUser = new User(inforUser);
    await newUser.save();
    
    res.json({
        code : 200,
        message : "Đăng ký tài khoản thành công !"
    })
}