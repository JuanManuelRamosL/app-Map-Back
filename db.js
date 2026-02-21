const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:juanma123@localhost:1111/Caca",
  {
    logging: false,
  },
);

module.exports = sequelize;
