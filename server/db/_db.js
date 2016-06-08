var path = require('path');
var Sequelize = require('sequelize');

var env = require(path.join(__dirname, '../env')); //depends on environment! e.g. testing, development, production
var db = new Sequelize(env.DATABASE_URI);

module.exports = db;
