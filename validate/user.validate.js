const User = require("../v1/models/user.models");
const forgotPassword = require("../v1/models/forgot-password.models");

module.exports.register = async (req, res, next) =>{
    if(!req.body.fullName || req.body.fullName.length < 8){
        res.json({
            code : 400,
            message : "Name require not null"
        })
        return;
    }
    if(!req.body.email.includes("@gmail.com") || !req.body.email){
        res.json({
            code : 400,
            message : "Email is incorrect"
        })
        return;
    }
    if(!req.body.password || req.body.password.length < 8){
        res.json({
            code : 400,
            message : "Password is incorrect!"
        })
        return;
    }
    const exsitEmail = await User.findOne({
        email : req.body.email,
    })

    if(exsitEmail){
        res.json({
            code : 400,
            message : "Email has been exsit !"
        })
        return;
    }
 
    next();
}

module.exports.login = async (req, res, next) =>{
    if(!req.body.email.includes("@gmail.com") || !req.body.email){
        res.json({
            code : 400,
            message : "Email is incorrect"
        })
        return;
    }
    if(!req.body.password || req.body.password.length < 8){
        res.json({
            code : 400,
            message : "Password is incorrect!"
        })
        return;
    }
 
    next();
}

module.exports.forgot = async (req, res, next) =>{
    if(!req.body.email.includes("@gmail.com") || !req.body.email){
        res.json({
            code : 400,
            message : "Email is incorrect"
        })
        return;
    }
    const exsitEmail = await User.findOne({
        email : req.body.email,
    })
    if(!exsitEmail){
        res.json({
            code : 400,
            message : "Email hasn't been exsit !"
        })
        return;
    }

    const forgot_password = await forgotPassword.findOne({
        email : req.body.email,
    })
    if(forgot_password){
        res.json({
            code : 400,
            message : "OTP hasn't been tranfer !"
        })
        return;
    }
    next();
}