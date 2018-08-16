const path = require('path');

module.exports = (req, res) => {
    res.set('Content-Type', 'text/html');
    res.sendFile(path.resolve(__dirname, '..', 'views', 'index.html'));
}
