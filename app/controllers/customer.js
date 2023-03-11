
const Customers = require("../models/customer");
const CustomerSales = require("../models/CustomerSales");
const Sequelize  = require("sequelize");

const sequelize = require("../utils/database");

const retailers = require("../models/retailer");
const inventory = require("../models/inventory");



module.exports = {
    getCustomerSales: (async (req, res) => {
      console.log("in");
        await Customers.findAll(
          { include: CustomerSales }
         )
            .then(Customers => {
              res.json(Customers);
            })
            .catch(err => {
              res.json({ error: err });
            });
    }),

    getSoldProducts: (async (req, res) => {
      console.log("in");
      await CustomerSales.findAll(
        {
          attributes: ["ProductName",
          [sequelize.fn('SUM', sequelize.col('Quantity')), 'quantitySold'],
           [sequelize.fn('MAX', sequelize.col('Price')), 'Price'],
           [sequelize.fn('MAX', sequelize.col('TotalPrice')), 'TotalPrice'],
           [sequelize.fn('MAX', sequelize.col('Tax')), 'Tax'],
           [sequelize.fn('MAX', sequelize.col('Discount')), 'Discount']
        ],
          group: ['ProductName']}
       )
          .then(Sales => {
            res.json(Sales);
          })
          .catch(err => {
            res.json({ error: err });
          });
    }),


    
    createCustomerSales: (async (req, res) => {
        try {
            const { CustomersData, CustomerSalesData } = req.body;
            const Customer = await Customers.findOrCreate({
              where: {
                CustomerName: CustomersData.CustomerName,
                InvoiceNumber: CustomersData.InvoiceNumber
              },
              defaults: CustomersData
            });
            console.log(Customer);
            // If there is sales data, insert or update it
            if (CustomerSalesData && CustomerSalesData.length) {
              for (let i = 0; i < CustomerSalesData.length; i++) {
                console.log(CustomerSalesData[i],"lll");
                let inv = CustomerSalesData[i];
                inv["CustomerId"] = Customer[0].Id;
                inv.DateOfPurchase = CustomersData.DateOfPurchase;
                console.log(inv,"sdndsnjb");
                await CustomerSales.findOrCreate({
                  where: {
                    DateOfPurchase: new Date(CustomersData.DateOfPurchase),
                    CustomerId: inv['CustomerId'],
                    ProductName : inv.ProductName
                  },
                  defaults:  {...inv, CustomerId: Customer[0].Id} 
                });
              }
            }
            res.sendStatus(200);
          } catch (error) {
            console.error(error);
            res.sendStatus(500);
          }
    })
    
}
