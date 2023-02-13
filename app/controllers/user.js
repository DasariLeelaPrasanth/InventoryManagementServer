const Users = require("../models/users");


const UserController = {
    getUsers :  (async (req,res) => {
        try{
           let usersData = await Users.findAll();
           res.status(200).send(usersData);
        }catch(err){
            console.log(err);
            throw err
        }
    }),

    getUserById : (async (req,res) => {
        try{
            let userId = req.params.id;
            let userData = await Users.findByPk(userId);
            res.status(200).send(userData);
        }catch(err){
            console.log(err);
            throw err
        }
    }),

    addUser : (async (req,res) => {
        let body = req.body;
        console.log(body,"bodybody");
        try{
            let data = await Users.upsert(body);
            res.status(201).send(data);
        }catch(err){
            console.log(err);
            throw err
        }
    })
}

module.exports = UserController;

