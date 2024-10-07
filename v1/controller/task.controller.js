const Task = require("../models/task.models");

module.exports.index = async (req , res) => {
   try {
        const find = {
            deleted  :"false"
        }
        
        console.log(req.query)
        //Lọc theo trạng thái
        if(req.query.status){
            find.status = req.query.status;
        }
        //Hết lọc theo trạng thái

        //Sắp xếp
        const sort = {};
        if(req.query.sortKey && req.query.sortValue){
            sort[req.query.sortKey]  =  req.query.sortValue;
        }
        //Sắp xếp


        //Phân trang
        const pagination = {
            limit: 2,
            page: 1
        }
        if(req.query.page){
            const page = parseInt(req.query.page)
            const skip = ( page - 1 ) * pagination.limit;
            pagination.skip = skip;
        }
        //Phân trang

        //Tìm kiếm
        if(req.query.keyWord){
            find.title = req.query.keyWord;
        } 
        //Tìm kiếm


        const tasks = await Task.find(find).sort(sort).limit(pagination.limit).skip(pagination.skip);

        
        res.json(tasks);
   } catch (error) {
        console.log(error);
        res.redirect("back");
   }
}

module.exports.detail = async (req , res) => {
    const tasks = await Task.find({
        _id : req.params.id,
        deleted  :"false"
    })
    res.json(tasks);
}

module.exports.changeStatus = async (req , res) => {
     try {
        const status = req.body.status;
        await Task.updateOne({
            _id : req.params.id,
            deleted  :"false"
        },{
            status : status
        })
        res.json({
            code : 200,
            message: "Cập nhật trạng thái thành công !"
        });
    } catch (error) {
        res.json({
            code : 400,
            message: "Không tìm thấy bản ghi !"
        });
    }
}


module.exports.changeMulti = async (req , res) => {
    try {
        const {ids, status} = req.body;
        const listStatus = ["initial","finish","pending","doing","notFinish"];
        if(listStatus.includes(status)){
            await Task.updateMany({
                _id :{$in : ids},
                deleted  :"false"
            },{
                status : status
            })
        }
       res.json({
           code : 200,
           message: "Cập nhật trạng thái thành công !"
       });
   } catch (error) {
       res.json({
           code : 400,
           message: "Không tìm thấy bản ghi !"
       });
   }
}

// [POST] /v1/api/task/create
module.exports.createPost = async (req , res) => {
    const newTask = new Task(req.body);

    await newTask.save();
    res.json({
        code : 200,
        message: "Tạo mới công việc thành công!"
    })
}

// [PATCH] /v1/api/task/edit/:id
module.exports.edit = async (req , res) => {
    await Task.updateOne({
        _id : req.params.id
    },req.body)

    res.json({
        code : 400,
        message : "Sửa sản phẩm thành công !"
    })
}

// [PATCH] /v1/api/task/edit-multi
module.exports.editMulti = async (req , res) => {
   try {
        const {ids, status} = req.body;
        await Task.updateMany(
            { _id: { $in: ids } },
            { $set: {status} }
        );

        res.json({
            code : 400,
            message : "Chỉnh sửa các sản phẩm thành công!"
        })
   } catch (error) {
        res.json({
            code : 200,
            message : "Chỉnh sửa các sản phẩm không thành công!"
        })
   }
}

// [PATCH] /v1/api/task/delete/:id
module.exports.delete = async (req , res) => {
    try {
        await Task.updateOne({
            _id : req.params.id
        },{
            deleted: true,
            deletedAt: new Date()
        })
        res.json({
            code: 200,
            message: "Xóa công việc thành công!"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Xóa công việc không thành công!"
        })
    }
}

//[PATCH] /v1/api/task/delete-multi
module.exports.deleteMulti = async (req , res) => {
    const ids = req.body.ids
        await Task.updateMany({
            _id : {$in : ids}
        },{
            deleted: true,
            deletedAt: new Date()
        })
        res.json({
            code: 200,
            message: "Xóa công việc thành công!"
        })
}

