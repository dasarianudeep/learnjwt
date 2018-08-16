const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./config/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/private', require('./middleware/auth_user'));

app.get('/', require('./controllers/home'));

app.post('/auth', require('./controllers/authorize'));

app.get('/private', require('./controllers/private'));

app.get('/logout', require('./controllers/logout'));

app.listen(3000, function(req, res) {
    console.log('Server listening to Port - 3000')
});
