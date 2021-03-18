const create = ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (name , email, password, rol, register_date) VALUES (?,?,?,?,?)', [name, email, password, 'attendee', new Date()], (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0]);
        })
    })
}

module.exports = {
    create, getByEmail
}