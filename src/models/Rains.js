'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rains extends Model {

  };
  Rains.init({
    status: DataTypes.INTEGER,
    time: DataTypes.TIME, 
    date: DataTypes.DATEONLY, 
  }, {
    sequelize,
    modelName: 'Rains',
    timestamps: false,
  });
  return Rains;
};