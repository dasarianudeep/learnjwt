const path = require('path');
const db = require('../config/db').db;
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const user = {
    name: 'anudeep',
    password: 'pwd123'
};

const JWT_SECRET = 'my jwt secret';

module.exports = async (req, res) => {
    const body = req.body;
    if (body.username === user.name && body.password === user.password) {
        // Generates a unique ID
        const uid = crypto.randomBytes(16).toString('hex');

        // Generate JWT token
        const token = jwt.sign({ uid: uid }, JWT_SECRET, { expiresIn: '7d' });

        // Generate user record and persist in DB
        const record = {
            isValidAuth: true,
            uid: uid,
            createdOn: new Date().toLocaleDateString()
        };
        await db.put(uid, JSON.stringify(record));
        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('/private');
    } else {
        res.sendFile(path.resolve(__dirname, '..', 'views', 'error.html'));
    }
}
