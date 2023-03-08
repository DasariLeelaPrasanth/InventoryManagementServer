const Sequelize  = require("sequelize");

const sequelize = require("../utils/database");

const Users = sequelize.define("users", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  UserName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  SubscriptionStart: Sequelize.DATE,
  SubscriptionEnd: Sequelize.DATE,
  MobileNumber: {
    type: Sequelize.BIGINT,
    allowNull: true,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  LogoPath: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  SignaturePath: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  CompanyName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  GSTNumber: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Token: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Status : {
    type: Sequelize.ENUM("inactive", "active"),
    defaultValue: "active"
  },

  createdAt: {
    field: "CreatedAt",
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },

  updatedAt: {
    field: "UpdatedAt",
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Users;



