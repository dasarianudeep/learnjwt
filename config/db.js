const level = require('level');
const db = level(__dirname+'/db');

exports.db =  db;
