
// id - pk
// userId - fk
// purchasedId -fk
// productName
// Date of purchase
// quantity -10
// costprice
// sellingprice
// warranty
// tax
// current quantity -5 
// status - inactive
// createdAt
// updatedAt



module.exports =  ((sequelize, DataTypes) => {
  return  sequelize.define('Inventory',{
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ProductName : DataTypes.STRING,
        DateOfPurchase : DataTypes.DATE,
        Quantity : DataTypes.INTEGER,
        CostPrice : DataTypes.INTEGER,
        SellingPrice : DataTypes.INTEGER,
        Warranty : DataTypes.INTEGER,
        Tax : DataTypes.INTEGER,
        CurrentQuantity : DataTypes.INTEGER,
        Status : {
            type: DataTypes.ENUM("inactive", "active"),
            defaultValue: "inactive"
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
