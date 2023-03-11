// userId - fk
// customerId - fk
// pn
// quantity
// price -100
// discount - 10 - 90
// tax - 9
// amount after  tax - 81
// createdAt
// updatedAt

const Sequelize  = require("sequelize");

const sequelize = require("../utils/database");
// const Sequelize  = require("sequelize");
// const sequelize = require("../utils/database");
const Customers = require("./customer");

const CustomerSales = sequelize.define('CustomerSales',{
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ProductName : Sequelize.STRING,
        DateOfPurchase : {
            type: Sequelize.DATE,
            allowNull: true,
        },
        Quantity : Sequelize.INTEGER,
        Price : Sequelize.INTEGER,
        Discount : Sequelize.INTEGER,
        Tax : Sequelize.INTEGER,
        TotalPrice : Sequelize.INTEGER,
        Status : {
            type: Sequelize.ENUM("inactive", "active"),
            defaultValue: "active"
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

Customers.hasMany(CustomerSales);
CustomerSales.belongsTo(Customers, {
  foreignKey: {
    name: 'CustomerId',
    allowNull: false
  }
});

// module.exports = CustomerSales;
module.exports = CustomerSales;

       
