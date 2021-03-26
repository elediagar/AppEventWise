const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {

    //header
    if (!req.headers['authorization']) {
        return res.json({ error: 'Falta incluir el header de authorization' })
    }
    //valid token
    const token = req.headers['authorization'];
    let data;
    try {
        data = jwt.verify(token, 'clave token');
    } catch (error) {
        return res.json({ error: 'el token es incorrecto' })
    }

    //expired token
    if (dayjs().unix() > data.expire) {
        return res.json({ error: 'el token está caducado' })
    }

    //userID

    req.userId = data.userId;
    next()
}

module.exports = {
    checkToken
}