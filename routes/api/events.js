const { getAll, getById } = require('../../models/events');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const events = await getAll();
        res.json(events);
    } catch (err) {
        res.json({ error: error.message });
    }
});

router.get('/:idEvent', async (req, res) => {
    try {
        const event = await getById(req.params.idEvent);
        res.json(event);
    } catch (err) {
        res.json({ error: error.message });
    }
});


module.exports = router;
