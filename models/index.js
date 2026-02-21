const Usuario = require('./Usuario');
const Bano = require('./Bano');
const Comentario = require('./Comentario');

// Relaciones
Usuario.belongsToMany(Bano, { through: Comentario, foreignKey: 'usuarioId' });
Bano.belongsToMany(Usuario, { through: Comentario, foreignKey: 'banoId' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Comentario.belongsTo(Bano, { foreignKey: 'banoId' });

module.exports = { Usuario, Bano, Comentario };