const mongoose = require('mongoose')
const { urlDb } = require('../config')

mongoose.connect('mongodb://localhost:27017/db_bwa_semina');
console.log(urlDb)
const db = mongoose.connection

module.exports = db