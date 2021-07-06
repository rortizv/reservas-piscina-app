const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {

    if(req.headers['usuario-token']) {
        return res.json({ error: 'Necesitas incluir el usuario-token en la cabecera' });
    }

    const usuarioToken = req.headers['usuario-token'];
    let payload = {};

    try {
        payload = jwt.decode(usuarioToken, 'frase secreta');
    } catch (err) {
        return res.json({ error: 'El token es incorrecto'});
    }

    if(payload.expiredAt < moment().unix()) {
        return res.json({ error: 'El token ha expirado' });
    }

    req.usuarioId = payload.usuarioId;

    next();
}

module.exports = {
    checkToken: checkToken
}