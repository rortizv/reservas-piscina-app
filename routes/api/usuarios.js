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

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).json({ errores: errors.array()})
        }
    
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const usuario = await Usuario.create(req.body);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400);
    }

});

router.post('/login', async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { username: req.body.username } });
        if(usuario) {
            const iguales = bcrypt.compareSync(req.body.password, usuario.password);
            if(iguales) {
                res.status(200).json({ success: createToken(usuario) });
            } else {
                res.status(400).json({ error: 'Error en username y/o password'});
            }
        } else {
            res.status(400).json({ error: 'Error en username y/o password'});
        }
    } catch (error) {
        res.status(400);
    }
});

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400);
    }
});

router.put('/:id_usuario', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        await Usuario.update(req.body, {
            where: { id_usuario: req.params.id_usuario}
        });
        
        await Usuario.update(req.body);
        res.status(200).json({ success: 'Modificado correctamente'});
    } catch (error) {
        res.status(400);
    }
});

router.delete('/:id_usuario', async (req, res) => {
    try {
        await Usuario.destroy({
            where: { id_usuario: req.params.id_usuario}
        });
        res.status(200).json({ success: 'Eliminado correctamente'});
    } catch (error) {
        res.status(400);
    }
});

const createToken = (usuario) => {
    try {
        const payload = {
            usuarioId: usuario.id,
            createdAt: moment().unix(),
            expiredAt: moment().add(5, 'minutes').unix()
        }
        
        return jwt.encode(payload, 'frase secreta');
    } catch (error) {
        res.status(401);
    }
}

module.exports = router;