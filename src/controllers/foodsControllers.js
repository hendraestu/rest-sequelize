const  {foods} = require("../models/");

module.exports = {
    getAllfoods : (req, res)=>{
        foods.findAll()
        .then((data)=>{
            res.send({
                msg: "berhasil menampilkan",
                status: 200,
                data
            });
        })
        .catch ((err)=>{
            res.send({
                msg:"error",
                status: 500,
                err,
            });
        });
    },
    postFoods : (req, res)=>{
        let {body} = req;
        foods.create(body)
        .then((data)=>{
            res.status(200).send({
                msg: "berhasil menambah data",
                status: 200,
                data,
            });
        })
        .catch((err)=>{
            res.status(500).send({
                msg: "data gagal ditambahkan",
                status: 500,
                err,
            });
        });
    },
    getDataById : (req, res)=>{
        let {id} = req.params;
        foods.findOne({
            where : {id}
        })
        .then((data)=>{
            res.status(200).send({
                msg: "data ditemukan",
                status: 200,
                data,
            });
        })
        .catch((err)=>{
            res.status(500).send({
                msg: "gagal menemukan data",
                status: 500,
                err,
            });
        });
    },
    deleteFoods : async (req, res)=>{
        let {id} = req.params;

        const findFoods = await foods.findOne({
            where: {id}
        });

        if(findFoods === null){
            res.status(404).send({
                msg: "delet error",
                status: 404,
                error: "data tidak ditemukan"
            })
        }

        foods.destroy({
            where : {id}
        })
        .then((data)=>{
            res.status(200).send({
                msg: "berhasil menghapus data",
                status: 200,
                data: findFoods,
            });
        })
        .catch((err)=>{
            res.status(500).send({
                msg: "gagal menghapus data",
                status: 500,
                err,
            });
        });
    },
    updateFoods : async (req, res)=>{
        let {id} = req.params;
        let {body} = req;

        const findFoods = await foods.findOne({
            where: {id}
        });

        if(findFoods === null){
            res.status(404).send({
                msg: "update error",
                status: 404,
                error: "data tidak ditemukan"
            })
        }

        foods.update(body, {
            where : {id}
        })
        .then((data)=>{
            console.log(findFoods);
            const resObjeck = {...findFoods.datavalues, ...body};
            res.status(200).send({
                msg: "berhasil mengupdate data",
                status: 200,
                data: resObjeck,
            })
        })
        .catch((err)=>{
            res.status(500).send({
                msg: "gagal mengupdate data",
                status: 500,
                err,
            })
        })
    },
};