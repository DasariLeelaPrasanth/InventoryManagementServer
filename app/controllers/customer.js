// const jwt = require('jsonwebtoken');
// var db = require('../config/dbConfig');

// const Customer = db["Customers"];
// const CustomerSale = db["CustomerSales"];



// module.exports = {
//     getCustomerSales: (async (req, res) => {
//         Customer.findAll({
//             include: [{
//               model: CustomerSale
//             }]
//           })
//             .then(customers => {
//               res.json(customers);
//             })
//             .catch(err => {
//               res.json({ error: err });
//             });
    
//     }),

//     getCustomerSalesById: (async (req, res) => {
//         try {
//             const customer = await Customer.findByPk(req.params.id, {
//               include: [{ model: CustomerSale, as: "customerSales" }]
//             });
        
//             if (!customer) {
//               return res.status(404).json({ error: "Customer not found" });
//             }
        
//             res.json({ customer });
//           } catch (error) {
//             res.status(400).json({ error: error.message });
//           }
    
//     }),

//     createCustomerSales: (async (req, res) => {
//         try {
//             const { customerData, salesData } = req.body;
//             const customer = await Customer.findOrCreate({
//               where: {
//                 name: customerData.name,
//                 email: customerData.email
//               },
//               defaults: customerData
//             });
        
//             // If there is sales data, insert or update it
//             if (salesData && salesData.length) {
//               for (let i = 0; i < salesData.length; i++) {
//                 const sale = salesData[i];
//                 sale.customerId = customer[0].id;
//                 await CustomerSale.findOrCreate({
//                   where: {
//                     date: sale.date,
//                     customerId: sale.customerId
//                   },
//                   defaults: sale
//                 });
//               }
//             }
//             res.sendStatus(200);
//           } catch (error) {
//             console.error(error);
//             res.sendStatus(500);
//           }
//     })
    
// }

const customer = require("../models/customer");
const customerSales = require("../models/customerSales");

