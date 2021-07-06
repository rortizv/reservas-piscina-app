module.exports = (sequelize, type) => {
    return sequelize.define('RESERVAS', {
        id_reserva: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_reserva: type.DATE,
        turno: type.STRING,
        id_usuario: type.INTEGER
    })
}