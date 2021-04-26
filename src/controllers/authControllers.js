const {users, Sequelize} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const op = Sequelize.Op;

module.exports = {
    signup: (req, res) =>{
        const {body} = req;
        const saltRounds = 10;

        body.password = bcrypt.hashSync(body.password, saltRounds);

        console.log(body)
        
        users.create(body)
        .then((data)=>{
            res.status(200).send({
                msg: "sign-up berhasil",
                status: 200,
                data,
            })
            .catch((err)=>{
                res.status(500).send({
                    msg: "sign-up gagal",
                    status: 500,
                    err,
                })
            })
        })
    },
    signin: async(req, res)=>{
        const {body} = req;

        let findUser = await users.findOne({
            where:{
                [op.or]: [{username: body.username}, {email: body.username}]
            },
        });
        if(findUser === null){
            res.status(404).send({
                msg: "sign in error",
                status: 404,
                error: "user tidak ditemukan"
            })
        }
        const isValidPassword = bcrypt.compareSync(
            body.password,
            findUser.dataValues.password
        );
        if(!isValidPassword){
            res.status(403).send({
                msg: "sign error",
                status: 403,
                error: "password is invalid",
            })
        }
        const payload = {
            id: findUser.dataValues.id,
            username: findUser.dataValues.username,
            email: findUser.dataValues.email,
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400,
        });
        delete findUser.dataValues.password;
        res.status(200).send({
            msg:"sign berhasil",
            status: 200,
            data:{...findUser.dataValues, token},
        })
    }
};