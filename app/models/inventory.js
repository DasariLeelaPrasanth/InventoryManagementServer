
// id - pk
// userId - fk
// purchasedId -fk
// productName
// Date of purchase
// quantity -10
// costprice
// sellingprice
// warranty
// tax
// current quantity -5 
// status - inactive
// createdAt
// updatedAt



const Sequelize  = require("sequelize");

const sequelize = require("../utils/database");

const Inventory = sequelize.define('Inventory',{


        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ProductName : Sequelize.STRING,
        DateOfPurchase :{
            type: Sequelize.DATE,
            allowNull: true,
        },
        Quantity : Sequelize.INTEGER,
        CostPrice : Sequelize.INTEGER,
        SellingPrice : Sequelize.INTEGER,
        Warranty : Sequelize.INTEGER,
        Tax : Sequelize.INTEGER,
        CurrentQuantity : Sequelize.INTEGER,
        Discount : Sequelize.INTEGER,
        Status : {
            type: Sequelize.ENUM("inactive", "active"),
            defaultValue: "inactive"
        },
    
            createdAt : {
                field: 'CreatedAt',
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
             },
    
            updatedAt : {
                field: 'UpdatedAt',
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
             }
    })
    
    module.exports = Inventory;

       
