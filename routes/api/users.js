const { create, getByEmail } = require('../../models/users');

const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

router.post('/register', async (req, res) => {

    //crypt password

    req.body.password = bcrypt.hashSync(req.body.password, 10)

    const result = await create(req.body);
    res.json(result)
});

router.post('/login', async (req, res) => {
    const user = await getByEmail(req.body.email);
    if (user) {
        const passwordOk = bcrypt.compareSync(req.body.password, user.password);
        if (passwordOk) {
            res.json({
                success: 'Login correcto!!',
                token: createToken(user)
            })
        } else {
            res.json({ error: 'Error en email y/o password' })
        }
    } else {
        res.json({ error: 'Error en email y/o password' })
    }
});

function createToken(pUser) {
    const data = {
        userId: pUser.id,
        expire: dayjs().add(1, 'week').unix()
    }
    return jwt.sign(data, 'clave token');
}



module.exports = router;