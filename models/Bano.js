const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bano = sequelize.define('Bano', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  direccion: { type: DataTypes.STRING, allowNull: false },
  lat: { type: DataTypes.FLOAT, allowNull: false },
  lon: { type: DataTypes.FLOAT, allowNull: false },
  imagen: { type: DataTypes.STRING }, // URL o path de la imagen
});

module.exports = Bano;