const User = require("../models/user.models");
const md5 = require("md5");
const generateRandom = require("../../helper/generateRandom.helper");
const forgotPassword = require("../models/forgot-password.models");
const sendEmailHelper = require("../../helper/sendEmail.helper");

module.exports.register = async (req, res) =>{
    const inforUser = {
        fullName:  req.body.fullName ,
        email: req.body.email,
        password:md5(req.body.password),
        tokenUser: generateRandom.generateRandomString(30),
    }

    const newUser = new User(inforUser);
    await newUser.save();
    
    res.json({
        code : 200,
        message : "Đăng ký tài khoản thành công !"
    })
}

// [POST] /v1/api/user/login
module.exports.login = async (req,res) =>{
    const exsitEmail = await User.findOne({
        email : req.body.email,
    })
    if(!exsitEmail){
        res.json({
            code : 400,
            message : "Email không tồn tại !"
        })
        return ;
    }
    if(md5(req.body.password) != exsitEmail.password){
        res.json({
            code : 400,
            message : "Sai mật khẩu!"
        })
        return ;
    }
    const token = exsitEmail.tokenUser; 
    console.log(token)
    res.json({
        code : 200,
        token : token,
        message : "Đăng nhập thành công !"
    })
}

module.exports.forgot  = async (req,res) =>{
    // Việc 1: Lưu email, OTP vào database
    const otp = generateRandom.generateRandomNum(6);

    const inforForget = {
        email: req.body.email,
        otp: otp,
        expireAt:  Date.now() + 3*60*1000
    }
    const newForgot = new forgotPassword(inforForget);
    await newForgot.save();
    // Việc 2: Gửi mã OTP qua mail cho người dùng
    const subject = "Lấy lại mật khẩu.";
    const text = `Mã OTP xác thực tài khoản của bạn là: ${otp}. Mã OTP có hiệu lực trong vòng 3 phút. Vui lòng không cung cấp mã OTP này với bất kỳ ai.`;
    sendEmailHelper.sendEmail(req.body.email, subject, text);

    res.json({
        code : 200,
        message : "Đã gửi mã OTP !"
    })
}

// POST /v1/api/user/password/otp
module.exports.otp  = async (req,res) =>{
    try {
        const authorize = await forgotPassword.findOne({
            email : req.body.email,
            otp : req.body.otp
        })
    
        if(!authorize){
            res.json({
                code : 400,
                message : "Xác thực thất bại !"
            })
        }
    
        const token = await User.findOne({
            email : req.body.email,
            deleted: false
        });
    
        res.json({
            code : 200,
            message : "Xác thực thành công !",
            tokenUser : token.tokenUser
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Xác thực thất bại !"
        })
    }
}

// POST /v1/api/user/password/reset
module.exports.reset  = async (req,res) =>{
    try {
        const {tokenUser, newPassword} =  req.body;
        const user = await User.findOne({
            tokenUser : tokenUser,
            deleted : false 
        })
        if(!User){
            res.json({
                code : 400,
                message : "Đổi mật khẩu thất bại !"
            }) 
        }
        await User.updateOne({
            tokenUser : tokenUser,
            deleted : false 
        },{
            password: md5(newPassword)
        })

        res.json({
            code : 200,
            message : "Đổi mật khẩu thành công !",
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Đổi mật khẩu thất bại !"
        })
    }
}

