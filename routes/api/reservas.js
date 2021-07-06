const router = require('express').Router();
const { Reserva } = require('../../db');

router.get('/', async (req, res) => {
    const reservas = await Reserva.findAll();
    res.json(reservas);
});

router.post('/', async (req, res) => {
    const reserva = await Reserva.create(req.body);
    res.json(reserva);
});

router.put('/:id_reserva', async (req, res) => {
    await Reserva.update(req.body, {
        where: { id_reserva: req.params.id_reserva}
    });
    res.json({ success: 'Modificado correctamente'});
});

router.delete('/:id_reserva', async (req, res) => {
    await Reserva.destroy({
        where: { id_reserva: req.params.id_reserva}
    });
    res.json({ success: 'Eliminado correctamente'});
});

module.exports = router;