const db = require('./dbConnection');
const express = require('express');
const app = express();
const DataSchema = require('./models/dataSchema');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const dataRoutes = require('./routes/dataRoutes');
require('dotenv').config();
const passport = require('./auth');

const port = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleTimeString()} request for  : ${req.originalUrl}`);
    next();
}

app.use(logRequest);


app.use(passport.initialize());

const localauthenticate = passport.authenticate('local', { session: false });

app.get('/', localauthenticate , function (req, res) {
    res.send('Hello World');
}) 

app.listen(port, () => {
    console.log('Server started on port 3000');
})

app.post('/create', async (req, res) => {

    try {
        const mydata = new DataSchema(req.body);
        await mydata.save();
        console.log('Data created');
        res.status(201).json({ message: 'Data created' });
    } catch (err) {
        console.log(err, "Error in creating data");
        res.status(400).json({ message: err.message });
    }
})

app.use('/read', dataRoutes);
app.use('/update', dataRoutes);
app.use('/delete', dataRoutes);

