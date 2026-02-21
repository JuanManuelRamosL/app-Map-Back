const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comentario = sequelize.define('Comentario', {
  texto: { type: DataTypes.TEXT },
  puntaje: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
});

module.exports = Comentario;