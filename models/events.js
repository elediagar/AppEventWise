const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE status = "active" AND date_start > CURRENT_DATE ORDER BY date_start DESC', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByHost = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE fk_user_host = ? && status = "active" AND date_start > CURRENT_DATE', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByHostExpired = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE fk_user_host = ? && status = "active" AND date_start < CURRENT_DATE', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByAttend = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT e.* FROM events e, user_event_attend ue WHERE ue.fk_event_attend = e.id AND ue.fk_user_attend = ? AND status = "active" AND date_start > CURRENT_DATE;', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByAttendExpired = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT e.* FROM events e, user_event_attend ue WHERE ue.fk_event_attend = e.id AND ue.fk_user_attend = ? AND status = "active" AND date_start < CURRENT_DATE;', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByFav = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT events.* FROM events JOIN user_event_fav ON events.id = user_event_fav.fk_event_fav JOIN users ON users.id = user_event_fav.fk_user_fav WHERE users.id = ? AND status = "active" AND date_start > CURRENT_DATE;', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByFavExpired = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT events.* FROM events JOIN user_event_fav ON events.id = user_event_fav.fk_event_fav JOIN users ON users.id = user_event_fav.fk_user_fav WHERE users.id = ? AND status = "active" AND date_start < CURRENT_DATE;', [pId], (err, rows) => {
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

const changeStatus = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE events SET status = "ended" WHERE id = ?', [pId], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

const addFav = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user_event_fav (fk_user_fav, fk_event_fav) values (?,?)', [user_id, event_id], (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}

const delFav = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM user_event_fav WHERE fk_user_fav = ? AND fk_event_fav = ?', [user_id, event_id], (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}

const checkFav = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user_event_fav WHERE fk_user_fav = ? AND fk_event_fav = ?', [user_id, event_id], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(false)
            resolve(true)
        })
    })
}

module.exports = {
    getAll, getByHost, create, getById, updateById, changeStatus, getByAttend, getByFav, addFav, checkFav, delFav, getByHostExpired, getByFavExpired, getByAttendExpired
}