const express = require('express');
const db = require('./app/config/dbConfig');
const router = express.Router();

const authenticationController = require('./app/controllers/authentication');

const customerController = require('./app/controllers/customer');
const retailerController = require('./app/controllers/retailer');

router
    .get('/', (req , res) =>{
        res.status(200).send("Welcome to Inventory Management");
    })
    .post('/login', authenticationController.login)

    .get('/getCustomerSales', customerController.getCustomerSales)
    .get('/getCustomerSalesById', customerController.getCustomerSalesById)
    .post('/createCustomerSales', customerController.createCustomerSales)


    .get('/getRetailers', retailerController.getRetailers)
    .get('/getRetailersById', retailerController.getRetailersById)
    .post('/createRetailers', retailerController.createRetailers)

    .get('/dataDump' , (req,res) => {
        db.DataDump()
        res.sendStatus(200)
    })
module.exports = router;