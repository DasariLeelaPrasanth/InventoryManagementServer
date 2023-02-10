const jwt = require('jsonwebtoken');
var db = require('../config/dbConfig');

const users = db.Users;


module.exports = {
    login: (async (req, res) => {
        console.log(req.body,"fbjbfeejk");
        let creds = req.body
        let user = await users.findOne({
            where: creds ,
          });
          if (!user) {
            return res.status(401).send({ message: 'Invalid credentials' })
        }

        const token = jwt.sign(creds.UserName, 'secretkey')
        user.token = token
        await user.save()
        res.send({ message: 'Success', token })
    
    }),
    
}
