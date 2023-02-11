// userId - fk
// id - pk
// seller name 
// phoneno
// email
// address
// gst no
// createdAt
// updatedAt

module.exports =  ((sequelize, DataTypes) => {
  return  sequelize.define('Customers',{
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
       
        MobileNumber : {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Email :  {
            type: DataTypes.STRING,
            allowNull: true,
        },
        Address :  {
            type: DataTypes.STRING,
            allowNull: true,
        },
        InvoiceNumber: DataTypes.STRING,
        CustomerName : DataTypes.STRING,
        BusinessName : DataTypes.STRING,
        GSTNumber :  {
            type: DataTypes.STRING,
            allowNull: true,
        },
        DateOfPurchase :  {
            type: DataTypes.DATE,
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
