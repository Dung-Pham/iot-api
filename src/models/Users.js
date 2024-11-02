'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {

  };
  Users.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    deviceId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: false,
  });
  return Users;
};