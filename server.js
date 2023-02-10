'use strict';
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const port = 3330;

const db = require('./app/config/dbConfig');

db.Connect();

const jwt = require('jsonwebtoken');

// for cors enable
app.use(cors());
app.options('*', cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use('/',router);


const checkToken = (req, res, next) => {
    console.log( req.headers," req.headers req.headers req.headers req.headers req.headers req.headers req.headers");
    const token = req.headers['x-access-token'] || req.headers['authorization']

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access' })
    }

    try {
        try{

            const decoded = jwt.verify(token, 'secretkey')
            req.user = decoded
            console.log( req.user," req.user req.user");
        }catch(e){
            console.log(e);
        }
        next()
    } catch (err) {
        return res.status(401).send({ message: 'Invalid token' })
    }
}

app.get('/secure', checkToken, (req, res) => {
    // Endpoint function
    res.sendStatus(200)
})

// db.Sync()
app.listen(port, ()=>{
    // logger.info(`Example app listening on port ${port}!`);
    console.log(`App is running at http://localhost:${port}` );
}) 

    
    