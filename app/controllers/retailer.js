const jwt = require('jsonwebtoken');
var db = require('../config/dbConfig');

const retailers = db["Retailers"];
const inventory = db["Inventory"];



module.exports = {
    getRetailers: (async (req, res) => {
        await retailers.findAll({
            include: [{
              model: inventory,
              as: 'inventory'
            }]
          })
            .then(retailers => {
              res.json(retailers);
            })
            .catch(err => {
              res.json({ error: err });
            });
    
    }),

    getRetailersById: (async (req, res) => {
        try {
            const retailer = await retailers.findByPk(req.params.id, {
              include: [{ model: inventory, as: "inventory" }]
            });
        
            if (!retailer) {
              return res.status(404).json({ error: "Customer not found" });
            }
        
            res.json({ retailer });
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
    
    }),

    createRetailers: (async (req, res) => {
        try {
            const { retailerData, inventoryData } = req.body;
            const retailer = await retailers.findOrCreate({
              where: {
                name: retailerData.name,
                email: retailerData.email
              },
              defaults: retailerData
            });
        
            // If there is sales data, insert or update it
            if (inventoryData && inventoryData.length) {
              for (let i = 0; i < inventoryData.length; i++) {
                const inv = inventoryData[i];
                inv.customerId = customer[0].id;
                await inventory.findOrCreate({
                  where: {
                    date: inv.date,
                    customerId: inv.customerId
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
