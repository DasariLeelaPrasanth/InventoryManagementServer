// userId - fk
// id - pk
// Retailername 
// phoneno
// email
// address
// gst no
// createdAt
// updatedAt

const Sequelize  = require("sequelize");

const sequelize = require("../utils/database");

const Retailers =  sequelize.define('Retailers',{
        Id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        MobileNumber :  {
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
        RetailerName : {
            type: Sequelize.STRING,
        },
        CustomerName : {
            type: Sequelize.STRING,
        },
        GSTNumber :{
            type: Sequelize.STRING,
            allowNull: true,
        },
        DateOfPurchase :
        {
            type: Sequelize.DATE,
            allowNull: true,
        },
 
        InvoiceNumber: Sequelize.STRING,
        Status : {
            type: Sequelize.ENUM("inactive", "active"),
            defaultValue: "active"
          },
        createdAt : {
            field: 'CreatedAt',
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue:Sequelize.NOW,
         },

        updatedAt : {
            field: 'UpdatedAt',
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue:Sequelize.NOW,
         }
        });

 
module.exports = Retailers;

       
