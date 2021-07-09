const router = require('express').Router();
const { Reserva } = require('../../db');

router.get('/', async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(400);
    }
});

router.post('/', async (req, res) => {
    try {
        const reserva = await Reserva.create(req.body);
        res.status(200).json(reserva);
    } catch (error) {
        res.status(400);
    }
});

router.put('/:id_reserva', async (req, res) => {
    try {
        await Reserva.update(req.body, {
            where: { id_reserva: req.params.id_reserva}
        });
        res.status(200).json({ success: 'Modificado correctamente'});
    } catch (error) {
        res.status(400);
    }
});

router.delete('/:id_reserva', async (req, res) => {
    try {
        await Reserva.destroy({
            where: { id_reserva: req.params.id_reserva}
        });
        res.status(200).json({ success: 'Eliminado correctamente'});
    } catch (error) {
        res.status(400);
    }
});

module.exports = router;