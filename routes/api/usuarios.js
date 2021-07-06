const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { Usuario } = require('../../db');
const { check, validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');

router.post('/register', [
    check('username', 'El username es obligatorio').not().isEmpty().isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errores: errors.array()})
    }

    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
});

router.post('/login', async (req, res) => {
    const usuario = await Usuario.findOne({ where: { username: req.body.username } });
    if(usuario) {
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if(iguales) {
            res.json({ success: createToken(usuario) });
        } else {
            res.json({ error: 'Error en username y/o password'});
        }
    } else {
        res.json({ error: 'Error en username y/o password'});
    }
});

router.get('/', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
});

router.put('/:id_usuario', async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    await Usuario.update(req.body, {
        where: { id_usuario: req.params.id_usuario}
    });
    
    await Usuario.update(req.body);
    res.json({ success: 'Modificado correctamente'});
});

router.delete('/:id_usuario', async (req, res) => {
    await Usuario.destroy({
        where: { id_usuario: req.params.id_usuario}
    });
    res.json({ success: 'Eliminado correctamente'});
});

const createToken = (usuario) => {
    const payload = {
        usuarioId: usuario.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(5, 'minutes').unix()
    }
    
    return jwt.encode(payload, 'palabra secreta');
}

module.exports = router;