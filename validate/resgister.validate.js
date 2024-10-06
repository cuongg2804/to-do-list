const User = require("../v1/models/user.models");

module.exports = async (req, res, next) =>{
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