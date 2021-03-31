const { getAll, getById, filterGetAll, filterByText } = require('../../models/events');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const events = await getAll();
        res.json(events);
    } catch (err) {
        res.json({ error: error.message });
    }
});

router.post('/filter', async (req, res) => {
    try {
        const events = await filterGetAll(req.body);
        res.json(events);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/filter/:text', async (req, res) => {
    try {
        const events = await filterByText(req.params.text);
        res.json(events);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/:idEvent', async (req, res) => {
    try {
        console.log("event");
        const event = await getById(req.params.idEvent);
        res.json(event);
    } catch (err) {
        res.json({ error: error.message });
    }
});


module.exports = router;
