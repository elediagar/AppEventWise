const router = require('express').Router();


const eventsApitRouter = require('./api/events');
const usersApitRouter = require('./api/events');

router.use("/events", eventsApitRouter);

module.exports = router;