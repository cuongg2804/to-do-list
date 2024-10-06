const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_ULR);
        console.log("Đã kết nối đến database thành công !");
    } catch (error) {
        console.log("Kết nối đến database thất bại !");
    }
}