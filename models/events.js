const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE status = "active" AND date_start > CURRENT_DATE ORDER BY date_start DESC', (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

// START FILTROS //

const filterGetAll = (categories) => {
    const values = new Array(categories.length).fill("?");
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM events WHERE category IN (${values.join(",")})`, categories, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const filterByText = (text) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM events WHERE name LIKE '%${text}%' OR description_short LIKE '%${text}%' OR company_name LIKE '%${text}%'`, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}



// END FILTROS //

const getByHost = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE fk_user_host = ? && status = "active" AND date_start >= CURRENT_DATE ORDER BY date_start DESC', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByHostExpired = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE fk_user_host = ? && status = "active" AND date_start < CURRENT_DATE ORDER BY date_start DESC', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByAttend = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT e.* FROM events e, user_event_attend ue WHERE ue.fk_event_attend = e.id AND ue.fk_user_attend = ? AND status = "active" AND date_start > CURRENT_DATE ORDER BY date_start DESC;', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByAttendExpired = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT e.* FROM events e, user_event_attend ue WHERE ue.fk_event_attend = e.id AND ue.fk_user_attend = ? AND status = "active" AND date_start < CURRENT_DATE ORDER BY date_start DESC;', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByFav = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT events.* FROM events JOIN user_event_fav ON events.id = user_event_fav.fk_event_fav JOIN users ON users.id = user_event_fav.fk_user_fav WHERE users.id = ? AND status = "active" AND date_start > CURRENT_DATE ORDER BY date_start DESC;', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

const getByFavExpired = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT events.* FROM events JOIN user_event_fav ON events.id = user_event_fav.fk_event_fav JOIN users ON users.id = user_event_fav.fk_user_fav WHERE users.id = ? AND status = "active" AND date_start < CURRENT_DATE ORDER BY date_start DESC;', [pId], (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}


const create = ({ status, name, date_start, date_end, category, company_name, company_sector, modality, address, city, country, description_short, description_long, url_extension, img, room_title1, room_description1, room_link1, room_title2, room_description2, room_link2 }, idHost) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO events(status, name, date_start, date_end, category, company_name, company_sector, modality, address, city, country, description_short, description_long, url_extension, img, room_title1, room_description1, room_link1, room_title2, room_description2, room_link2, fk_user_host) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [status, name, date_start, date_end, category, company_name, company_sector, modality, address, city, country, description_short, description_long, url_extension, img, room_title1, room_description1, room_link1, room_title2, room_description2, room_link2, idHost], (err, result) => {
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

const getAttendById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE id = ?', [pId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0])
        })
    })
}

const getHostById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE id = ?', [pId], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(null);
            resolve(rows[0])
        })
    })
}

const updateById = ({ name, date_start, date_end, category, company_name, company_sector, modality, address, city, country, description_short, description_long, url_extension, img, room_title1, room_description1, room_link1, room_title2, room_description2, room_link2 }, idEvent) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE events SET status="active", name = ?, date_start = ?, date_end = ?, category = ?, company_name = ?, company_sector = ?, modality = ?, address = ?, city = ?, country = ?, description_short = ?, description_long = ?, url_extension = ?, img = ?, room_title1 = ?, room_description1 = ?, room_link1 = ?, room_title2 = ?, room_description2 = ?, room_link2 = ? WHERE id = ?', [name, date_start, date_end, category, company_name, company_sector, modality, address, city, country, description_short, description_long, url_extension, img, room_title1, room_description1, room_link1, room_title2, room_description2, room_link2, idEvent], (err, result) => {
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

const checkAttend = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM user_event_attend WHERE fk_user_attend = ? AND fk_event_attend = ?', [user_id, event_id], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(false)
            resolve(true)
        })
    })
}

const checkHost = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM events WHERE fk_user_host = ? AND id = ?', [user_id, event_id], (err, rows) => {
            if (err) return reject(err);
            if (rows.length === 0) return resolve(false)
            resolve(true)
        })
    })
}

const addAttend = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO user_event_attend (fk_user_attend, fk_event_attend) values (?,?)', [user_id, event_id], (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}

const delAttend = (user_id, event_id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM user_event_attend WHERE fk_user_attend = ? AND fk_event_attend = ?', [user_id, event_id], (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}

module.exports = {
    getAll, getByHost, create, getById, updateById, changeStatus, getByAttend, getByFav, addFav, checkFav, delFav, getByHostExpired, getByFavExpired, getByAttendExpired, filterGetAll, addAttend, delAttend, checkAttend, getAttendById, checkHost, getHostById, filterByText
}