const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
sequelize.authenticate()
    .then(() => {
        console.log('Database Conected');
    })
    .catch(err => {
        console.log('error', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userModel = require('../models/userModel')(sequelize, Sequelize);
db.addressBookModel = require('../models/addressBookModel')(sequelize, Sequelize);
db.sequelize.sync()
    .then(() => {
        console.log('yes re-sync');
    })
module.exports = db;