const { getAll } = require('../../models/events');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const events = await getAll();
        res.json(events);
    } catch (err) {
        console.log(err);
    }

})

router.post('/', (req, res) => {
    res.json()
});


router.put('/', (req, res) => {
    res.json()
});


router.delete('/', (req, res) => {
    res.json()
});


module.exports = router;
