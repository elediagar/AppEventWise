const router = require('express').Router();
const { checkToken } = require('./middlewares/middleware')


const eventsApitRouter = require('./api/events');
const usersApitRouter = require('./api/users');


router.use("/events", checkToken, eventsApitRouter);
router.use("/users", usersApitRouter);

module.exports = router;