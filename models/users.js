const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = new Schema({

    name: {type: String},
    fullname: {type: String},
    password: {type: String},
    idstudent: { type: String, default: ''},
    faculty: { type: String, default: ''},
    avatar: { type: String, default: 'logotdt.png'},
    role: { type: String, default: '2'},
    authorization: {type: Array, default: []}
    
}, { collection: 'users' })

module.exports = mongoose.model('users', users)