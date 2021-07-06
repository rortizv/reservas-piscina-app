const router = require('express').Router();

const middlewares = require('./middlewares');
const apiReservasRouter = require('./api/reservas');
const apiUsuariosRouter = require('./api/usuarios');

router.use('/reservas', middlewares.checkToken, apiReservasRouter);
router.use('/usuarios', apiUsuariosRouter);

module.exports = router;