// id - auto inc - primary
// username
// password
// substart
// subend
// phoneno
// email
// address
// logo - string - sever file path
// company name
// gst number
// authentication token - 30 mins expiry - session
// createdAt
// updatedAt

module.exports =  ((sequelize, DataTypes) => {

   return sequelize.define('Users',{
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserName :  DataTypes.STRING,
        Password : DataTypes.STRING,
        SubscriptionStart : DataTypes.DATE,
        SubscriptionEnd : DataTypes.DATE ,
        MobileNumber :{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Email :{
            type: DataTypes.STRING,
            allowNull: true,
        },
        Address :{
            type: DataTypes.STRING,
            allowNull: true,
        },
        LogoPath :{
            type: DataTypes.STRING,
            allowNull: true,
        },
        CompanyName :{
            type: DataTypes.STRING,
            allowNull: true,
        },
        GSTNumber :{
            type: DataTypes.STRING,
            allowNull: true,
        },
        Token : {
            type: DataTypes.STRING,
            allowNull: true,
        },

    
        createdAt : {
            field: 'CreatedAt',
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: DataTypes.NOW,
         },

        updatedAt : {
            field: 'UpdatedAt',
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: DataTypes.NOW,
         }
    })
})

