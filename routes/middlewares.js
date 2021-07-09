const jwt = require('jwt-simple');
const moment = require('moment');

const checkToken = (req, res, next) => {
    console.log(req.headers["authorization"]);
    if(!req.headers["authorization"]) {
        return res.status(401).json({ error: 'Necesitas incluir el token en la cabecera' });
    }
    
    const usuarioToken = req.headers["authorization"];
    let payload = {};
    
    try {
        payload = jwt.decode(usuarioToken, 'frase secreta');
    } catch (err) {
        return res.status(401).json({ error: 'El token es incorrecto', err});
    }

    if(payload.expiredAt < moment().unix()) {
        return res.status(401).json({ error: 'El token ha expirado' });
    }

    req.id_usuario = payload.id_usuario;

    next();
}

module.exports = {
    checkToken: checkToken
}