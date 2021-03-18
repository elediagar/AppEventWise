const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const create = ({ name, company_name }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO events(name, company_name) values(?,?)', [name, company_name], (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}

const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE id = ?', [pId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0])
        })
    })
}

const updateById = ({ id, name, company_name }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE events SET name = ?, company_name = ? WHERE id = ?', [name, company_name, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

const deleteById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM events WHERE id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    getAll, create, getById, updateById, deleteById
}