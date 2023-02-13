const express = require('express');
const router = express.Router();

const userController = require('./app/controllers/user')
const authenticationController = require('./app/controllers/authentication');

const customerController = require('./app/controllers/customer');
const retailerController = require('./app/controllers/retailer');

router
    .get('/', (req , res) =>{
        res.status(200).send("Welcome to Inventory Management");
    })


    .get('/getUsers',userController.getUsers)

    .get('/getUserById/:id',userController.getUserById)

    .post('/addUser',userController.addUser)

    .post('/login', authenticationController.login)



    // .get('/getCustomerSales', customerController.getCustomerSales)
    // .get('/getCustomerSalesById', customerController.getCustomerSalesById)
    // .post('/createCustomerSales', customerController.createCustomerSales)


    .get('/getRetailers', retailerController.getRetailers)
    // .get('/getRetailersById', retailerController.getRetailersById)
    .post('/createRetailers', retailerController.createRetailers)

   
module.exports = router;