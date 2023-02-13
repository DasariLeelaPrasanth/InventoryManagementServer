// userId - fk
// id - pk
// seller name 
// phoneno
// email
// address
// gst no
// createdAt
// updatedAt

const Sequelize  = require("sequelize");

const sequelize = require("../utils/database");

const Customers = sequelize.define('Customers',{
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
       
        MobileNumber : {
            type: Sequelize.BIGINT,
            allowNull: true,
        },
        Email :  {
            type: Sequelize.STRING,
            allowNull: true,
        },
        Address :  {
            type: Sequelize.STRING,
            allowNull: true,
        },
        InvoiceNumber: Sequelize.STRING,
        CustomerName : Sequelize.STRING,
        BusinessName : Sequelize.STRING,
        GSTNumber :  {
            type: Sequelize.STRING,
            allowNull: true,
        },
        DateOfPurchase :  {
            type: Sequelize.DATE,
            allowNull: true,
        },     
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


module.exports = Customers;
