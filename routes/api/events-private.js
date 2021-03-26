const { create, updateById, changeStatus, getByHost, getByAttend, getByFav, addFav, checkFav, delFav, getByHostExpired, getByAttendExpired, getByFavExpired } = require('../../models/events');

const router = require('express').Router();

router.get('/checktoken', (req, res) => {
    res.json('checktoken')
})

router.get('/host', async (req, res) => {
    try {
        const events = await getByHost(req.userId);
        res.json(events)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.get('/host/expired', async (req, res) => {
    try {
        const events = await getByHostExpired(req.userId);
        res.json(events)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.get('/attend', async (req, res) => {
    try {
        const events = await getByAttend(req.userId);
        console.log(req.userId);
        res.json(events)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.get('/attend/expired', async (req, res) => {
    try {
        const events = await getByAttendExpired(req.userId);
        res.json(events)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.get('/fav', async (req, res) => {
    try {
        const events = await getByFav(req.userId);
        res.json(events)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.get('/fav/expired', async (req, res) => {
    try {
        const events = await getByFavExpired(req.userId);
        res.json(events)
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.get('/fav/:idEvent', async (req, res) => {
    try {
        const existFav = await checkFav(req.userId, req.params.idEvent)
        console.log(existFav);
        if (existFav == false) {
            const events = await addFav(req.userId, req.params.idEvent);
            res.json(events)
        } else {
            res.json({ error: 'el evento ya esta en favoritos' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
});

router.delete('/fav/:idEvent', async (req, res) => {
    try {
        const existFav = await checkFav(req.userId, req.params.idEvent)
        if (existFav == true) {
            const events = await delFav(req.userId, req.params.idEvent);
            res.json(events)
        } else {
            res.json({ error: 'el evento no esta en favoritos' })
        }
    } catch (error) {
        res.json({ error: error.message })
    }
});


router.post('/', async (req, res) => {
    try {
        const result = await create(req.body)
        req.body.status = 'active'
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

router.put('/:idEvent/delete', async (req, res) => {
    try {
        const result = await changeStatus(req.params.idEvent);
        res.json(result);
    } catch (error) {
        res.status(422).json({ error: error.message });
    }
});


module.exports = router;
