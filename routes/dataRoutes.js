const express = require('express');
const router = express.Router();
const DataSchema = require('../models/dataSchema');
const bodyParser = require('body-parser');

router.get('/', async (req, res) => {

    try {
        const data = await DataSchema.find();
        console.log('Data read');
        res.status(200).json(data);
    } catch (err) {
        console.log(err, "Error in reading data");
        res.status(400).json({ message: err.message });
    }
})

router.get('/:gender', async (req, res) => { 
    try {
        const gender = req.params.gender;
        if (gender == 'male' || gender == 'female') {
            const data = await DataSchema.find({ gender: gender });
            console.log('Data read');
            res.status(200).json(data);

        }
        else {
            res.status(400).json({ message: 'Invalid' });
        }

    } catch (err) {
        console.log(err, "Error in reading data");
        res.status(400).json({ message: err.message });
    }


})

router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const data = await DataSchema.findByIdAndUpdate(id, req.body,{
            new: true,
            runValidators: true
    }); 
    console.log('Data updated');
    res.status(200).json(data);

    } catch(err){
        console.log(err, "Error in updating data");
        res.status(400).json({ message: err.message });
    }
})


router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const data = await DataSchema.findByIdAndDelete(id);
    console.log('Data deleted');
    res.status(200).json(data);

    } catch(err){
        console.log(err, "Error in deleting data");
        res.status(400).json({ message: err.message });
    }
})

module.exports = router;