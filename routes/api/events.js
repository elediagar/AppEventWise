const { getAll, create, updateById, deleteById } = require('../../models/events');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const events = await getAll();
        res.json(events);
    } catch (err) {
        res.json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await create(req.body)
        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.put('/', async (req, res) => {
    try {
        const result = await updateById(req.body);
        res.json(result);
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.delete('/:idEvent', async (req, res) => {
    try {
        const result = await deleteById(req.params.idEvent);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


module.exports = router;
