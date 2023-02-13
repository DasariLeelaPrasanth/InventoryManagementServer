const Sequelize = require("sequelize");


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

module.exports = sequelize;