'use strict';
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const port = 3330;
const sequelize = require('./app/utils/database')


// for cors enable
app.use(cors());
app.options('*', cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));


  app.use('/',router);
  

const Users = require('./app/models/users');
const Retailers = require('./app/models/retailer');
const Customers = require('./app/models/customer');
const CustomerSales = require('./app/models/customerSales');
const Inventory = require('./app/models/inventory');

Users.hasMany(Retailers);
Retailers.belongsTo(Users ,{
    constraints: true,
    onDelete: 'CASCADE'
} );


Users.hasMany(Customers);
Customers.belongsTo(Users,{
  constraints: true,
    onDelete: 'CASCADE'
} );


Users.hasMany(CustomerSales);
CustomerSales.belongsTo(Users,{
  constraints: true,
    onDelete: 'CASCADE'
} );

Users.hasMany(Inventory);
Inventory.belongsTo(Users,{
  constraints: true,
    onDelete: 'CASCADE'
});

// Customers.hasMany(CustomerSales);
// CustomerSales.belongsTo(Customers,{
//     constraints: true,
//     onDelete: 'CASCADE'
// } );


Retailers.hasMany(Inventory);
Inventory.belongsTo(Retailers,{
    constraints: true,
    onDelete: 'CASCADE'
} );




sequelize
    .sync({force : false})
    .then(result => {
        app.listen(port, ()=>{
            // logger.info(`Example app listening on port ${port}!`);
            console.log(`App is running at http://localhost:${port}` );
        }) 
    })
    .catch(err => {
        console.log(err);
    })
