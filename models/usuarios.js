module.exports = (sequelize, type) => {
    return sequelize.define('USUARIOS', {
        id_usuario: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        password: type.STRING,
        torre_apto: type.STRING,
        tipo_usuario: type.STRING
    })
}