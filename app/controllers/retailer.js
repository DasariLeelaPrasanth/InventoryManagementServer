
const retailers = require("../models/retailer");
const inventory = require("../models/inventory");


const Sequelize  = require("sequelize");

const sequelize = require("../utils/database");

module.exports = {
    getRetailers: (async (req, res) => {
      console.log("in");
        await retailers.findAll(
          { include: inventory }
         )
            .then(retailers => {
              res.json(retailers);
            })
            .catch(err => {
              res.json({ error: err });
            });
    }),

    getInventory: (async (req, res) => {
      console.log("in");
      await inventory.findAll(
        {
          attributes: ["ProductName",
          [sequelize.fn('SUM', sequelize.col('Quantity')), 'TotalQuantity'],
           [sequelize.fn('SUM', sequelize.col('CurrentQuantity')), 'TotalCurrentQuantity'],
           [sequelize.fn('MAX', sequelize.col('CostPrice')), 'CostPrice'],
           [sequelize.fn('MAX', sequelize.col('SellingPrice')), 'SellingPrice'],
           [sequelize.fn('MAX', sequelize.col('Tax')), 'Tax'],
           [sequelize.fn('MAX', sequelize.col('Discount')), 'Discount'],
          "Warranty",
        "DateOfPurchase"
        ],
          group: ['ProductName','Warranty','DateOfPurchase']}
       )
          .then(inventory => {
            res.json(inventory);
          })
          .catch(err => {
            res.json({ error: err });
          });
    }),

    // getRetailersById: (async (req, res) => {
    //     try {
    //         const retailer = await retailers.findByPk(req.params.id, {
    //           include: [{ model: inventory, as: "inventory" }]
    //         });
        
    //         if (!retailer) {
    //           return res.status(404).json({ error: "Customer not found" });
    //         }
        
    //         res.json({ retailer });
    //       } catch (error) {
    //         res.status(400).json({ error: error.message });
    //       }
    
    // }),

    createRetailers: (async (req, res) => {
        try {
            const { retailerData, inventoryData } = req.body;
            const retailer = await retailers.findOrCreate({
              where: {
                CustomerName: retailerData.CustomerName,
                InvoiceNumber: retailerData.InvoiceNumber
              },
              defaults: retailerData
            });
            console.log(retailer);
            // If there is sales data, insert or update it
            if (inventoryData && inventoryData.length) {
              for (let i = 0; i < inventoryData.length; i++) {
                console.log(inventoryData[i],"lll");
                const inv = inventoryData[i];
                inv.RetailerId = retailer[0].Id;
                inv.DateOfPurchase = retailerData.DateOfPurchase;
                await inventory.findOrCreate({
                  where: {
                    DateOfPurchase: new Date(retailerData.DateOfPurchase),
                    RetailerId: inv.RetailerId,
                    ProductName : inv.ProductName
                  },
                  defaults: inv
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
