const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })

}

module.exports = {
    getAll
}