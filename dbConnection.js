const mongoose = require('mongoose');  
require('dotenv').config();

const mongoURL = 'mongodb://localhost:27017/learnJs';
// const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('MongoDB connected successfully');
});

db.on('error', (err)=>{
    console.log(err, 'Error in connecting to database');
});

db.on('disconnected', ()=>{
    console.log('MongoDB disconnected');
});

module.exports = db;