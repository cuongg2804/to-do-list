const User = require("../v1/models/user.models");

module.exports = async (req ,res, next) => {
    if(!req.headers.authorization){
        res.json({
            code : 400,
            message : "Không tồn tại Token !"
        })
        return ;
    }

    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
        tokenUser : token,
        deleted: false
    }).select("fullName email");

    if(!user){
        res.json({
            code : 400,
            message : "Token không hợp lệ !"
        })
        return ;
    }

    res.locals.user = user;
    next();
}