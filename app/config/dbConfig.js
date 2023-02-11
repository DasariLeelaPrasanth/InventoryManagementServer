const {Sequelize, DataTypes} = require("sequelize");
const fs = require('fs');

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
      await db["sequelize"].sync({force:false});
    } catch (error) {
      console.error(error);
    }
  },
  async DataDump(){
    var tables
    await sequelize.query("SHOW TABLES").then(([results, metadata]) => {
      tables = results.map(result => result[Object.keys(result)[0]]);
        console.log("Tables:", tables);
    });

    tables.forEach(table => {
      sequelize.query(`DESCRIBE ${table}`)
        .then(([results, metadata]) => {
          const columns = results.map(result => `${result.Field} ${result.Type}`).join(', ');
          const createTableQuery = `CREATE TABLE ${table} (${columns});`;
          sequelize.query(`SELECT * FROM ${table}`)
            .then(([results, metadata]) => {
              const sqlQueries = results.map(result => {
                const values = Object.values(result).map(value => {
                  if (typeof value === 'string') {
                    return `'${value.replace(/'/g, "\\'")}'`;
                  }
                  return value;
                });
                return `INSERT INTO ${table} VALUES (${values.join(', ')});`;
              });
              fs.writeFile(`./app/sql/${table}.sql`, `${createTableQuery}\n\n${sqlQueries.join('\n')}`, (err) => {
                if (err) throw err;
                console.log(`Table ${table} data and structure exported successfully`);
              });
            });
        });
    });

    
    // tables.forEach(table => {
    //   sequelize.query(`SELECT * FROM ${table}`)
    //     .then(([results, metadata]) => {
    //       const sqlQueries = results.map(result => {
    //         const values = Object.values(result).map(value => {
    //           if (typeof value === 'string') {
    //             return `'${value.replace(/'/g, "\\'")}'`;
    //           }
    //           return value;
    //         });
    //         return `INSERT INTO ${table} VALUES (${values.join(', ')});`;
    //       });
    //       fs.writeFile(`${table}.sql`, sqlQueries.join('\n'), (err) => {
    //         if (err) throw err;
    //         console.log(`Table ${table} data exported successfully`);
    //       });
    //     });
    // });

    // tables.forEach(table => {
    //   sequelize.query(`DESCRIBE ${table}`)
    //     .then(([results, metadata]) => {
    //       const tableStructure = results.map(result => result.Field);
    //       sequelize.query(`SELECT * FROM ${table}`)
    //         .then(([results, metadata]) => {
    //           const tableData = results.map(result => Object.values(result));
    //           fs.writeFile(`${table}.json`, JSON.stringify({
    //             structure: tableStructure,
    //             data: tableData
    //           }), (err) => {
    //             if (err) throw err;
    //             console.log(`Table ${table} data and structure exported successfully`);
    //           });
    //         });
    //     });
    // });
  }
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
