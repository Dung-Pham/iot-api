'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airs extends Model {

  };
  Airs.init({
    ppm: DataTypes.FLOAT,
    time: DataTypes.TIME, 
    date: DataTypes.DATEONLY, 
  }, {
    sequelize,
    modelName: 'Airs',
    timestamps: false,
  });
  return Airs;
};