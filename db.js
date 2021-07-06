const Sequelize = require('sequelize');

const UsuariosModel = require('./models/usuarios');
const ReservasModel = require('./models/reservas');

const sequelize = new Sequelize('unicartagena_programaciondistribuida', 'rortiz', 'rafa_2020', {
    host: 'mysql.unicartagena.co',
    dialect: 'mysql'
});

const Usuario = UsuariosModel(sequelize, Sequelize);
const Reserva = ReservasModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Tablas sincronizadas')
    })

module.exports = {
    Usuario,
    Reserva
}