const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const posts = new Schema({

    index: { type: Date, default: new Date().valueOf()},
    avatar: {type: String},
    username: {type: String},
    fullname: { type: String},
    description: { type: String},
    image: { type: String},
    date: {
        day: {type: Number, default: new Date().getDate()},
        month: {type: Number, default: new Date().getMonth()+1},
        year: {type: Number, default: new Date().getFullYear()},
        time_hours: {type: Number, default: new Date().getHours()},
        time_minutes: {type: Number, default: new Date().getMinutes()},
    },
    comment: {type: Array, default: []},
    like: {type: Array, default: []}
    
}, { collection: 'posts' })

module.exports = mongoose.model('posts', posts)