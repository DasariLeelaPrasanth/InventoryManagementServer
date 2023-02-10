// userId - fk
// customerId - fk
// pn
// quantity
// price -100
// discount - 10 - 90
// tax - 9
// amount after  tax - 81
// createdAt
// updatedAt

module.exports =  ((sequelize, DataTypes) => {
   return sequelize.define('CustomerSales',{
        Id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        UserId : {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                key: 'Id'
            }
        },
        CustomerId : { 
            type: DataTypes.INTEGER,
            references: {
                model: "Customers",
                key: 'Id'
            }
        },
        ProductName : DataTypes.STRING,
        DateOfPurchase : DataTypes.DATE,
        Quantity : DataTypes.INTEGER,
        Price : DataTypes.INTEGER,
        Discount : DataTypes.INTEGER,
        Tax : DataTypes.INTEGER,
        TotalPrice : DataTypes.INTEGER,
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
