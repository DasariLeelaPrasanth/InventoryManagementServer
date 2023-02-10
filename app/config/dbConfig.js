const {Sequelize, DataTypes} = require("sequelize");
// import { Sequelize,DataTypes } from 'sequelize';

const sequelize = new Sequelize('InventoryManagement','root','1234',{
    host:"localhost",
    dialect:"mysql",
    define: {
      timestamps: true,
      freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
});

let db = {
  async Connect() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  },
  async Sync() {
    try {
      console.log("lksldnlkb");
      await db["sequelize"].sync({force:true});
    } catch (error) {
      console.error(error);
    }
  },
};

db.Sequelize  = Sequelize;
db.sequelize = sequelize;

db["Users"] = require("../models/users")(sequelize, DataTypes);
db["Customers"] = require("../models/customer")(sequelize, DataTypes);
db["Retailers"] = require("../models/retailer")(sequelize, DataTypes);
db["CustomerSales"] = require("../models/customerSales")(sequelize, DataTypes);
db["Inventory"] = require("../models/inventory")(sequelize, DataTypes);



db["Users"] .hasMany(db["Customers"]);
db["Customers"].belongsTo(db["Users"],{
  foreignKey: "UserId",
  as: "Users",
} );

db["Users"] .hasMany(db["Retailers"]);
db["Retailers"].belongsTo(db["Users"] ,{
  foreignKey: "UserId",
  as: "Users",
} );

db["Users"] .hasMany(db["CustomerSales"]);
db["CustomerSales"].belongsTo(db["Users"],{
  foreignKey: "UserId",
  as: "Users",
} );
db["Customers"].hasMany(db["CustomerSales"]);
db["CustomerSales"].belongsTo(db["Customers"],{
  foreignKey: "CustomerId",
  as: "Customers",
} );


db["Retailers"].hasMany(db["Inventory"]);
db["Inventory"].belongsTo(db["Retailers"],{
  foreignKey: "RetailerId",
  as: "Retailers",
} );

db["Users"] .hasMany(db["Inventory"]);
db["Inventory"].belongsTo(db["Users"],{
  foreignKey: "UserId",
  as: "Users",
} );

db.Sync()

module.exports = db;
