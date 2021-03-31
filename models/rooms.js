const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM rooms', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const create = ({ title, description }, idEvent) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO rooms(title, description, fk_event) values(?,?,?)', [title, description, fk_event], (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}

const updateById = ({ id, title, description }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE rooms SET title = ?, description = ? WHERE id = ?', [title, description, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    getAll, create, updateById
}