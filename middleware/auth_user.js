const db = require('../config/db').db;
const jwt = require('jsonwebtoken');
const JWT_SECRET2 = 'my jwt secret';

module.exports = async (req, res, next) => {
    if (req.cookies.jwt) {
        const decoded = jwt.verify(req.cookies.jwt, JWT_SECRET2);
        const uid = decoded.uid;
        const record = JSON.parse(await db.get(uid));
        if (record.isValidAuth) {
            next();
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
}
