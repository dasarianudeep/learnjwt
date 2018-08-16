const JWT_SECRET = 'my jwt secret';
const db = require('../config/db').db;
const jwt = require('jsonwebtoken');

const JWT_SECRET1 = 'my jwt secret';

module.exports = async (req, res) => {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, JWT_SECRET1);
    const uid = decoded.uid;
    const record = JSON.parse(await db.get(uid));
    record.isValidAuth = false;
    await db.put(uid, record);
    res.clearCookie('jwt', { httpOnly: true });
    res.redirect('/');
}
