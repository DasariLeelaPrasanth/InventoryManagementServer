const express = require('express');
const router = express.Router();

const userController = require('./app/controllers/user')
const authenticationController = require('./app/controllers/authentication');

const customerController = require('./app/controllers/customer');
const retailerController = require('./app/controllers/retailer');
const fileUploadController = require('./app/controllers/fileUpload');
const dataDumpController = require('./app/controllers/dataDump');

router
    .get('/', (req , res) =>{
        res.status(200).send("Welcome to Inventory Management");
    })


    .get('/getUsers',userController.getUsers)

    .get('/getUserById/:id',userController.getUserById)

    .post('/addUser',userController.addUser)

    .post('/login', authenticationController.login)

   
    .get('/getCustomerSales', customerController.getCustomerSales)
    .get('/getSoldProducts', customerController.getSoldProducts)
    .post('/createCustomerSales', customerController.createCustomerSales)
    

    .get('/getRetailers', retailerController.getRetailers)
    .get('/getInventory', retailerController.getInventory)
    .post('/createRetailers', retailerController.createRetailers)

    .post('/addFile',fileUploadController.addFile)
    .get('/getFile/:id',fileUploadController.getFile)

    .get('/getDataDump' , dataDumpController.getDataDump)
    
module.exports = router;