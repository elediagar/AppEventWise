const router = require('express').Router();
const { checkToken } = require('./middlewares/middleware')


const eventsPrivateApiRouter = require('./api/events-private');
const eventsApiRouter = require('./api/events');
const usersApiRouter = require('./api/users');


router.use("/events-private", checkToken, eventsPrivateApiRouter);
router.use("/events", eventsApiRouter);
router.use("/users", usersApiRouter);


module.exports = router;