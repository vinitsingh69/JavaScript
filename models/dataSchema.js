const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    }
});



schema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashpswd = await bcrypt.hash(user.password, salt);
        user.password = hashpswd;
        next();
    } catch (err) {
        return next(err);
    }
})
  

 

schema.methods.comparePswd =  async function (password) {

    try {
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    } catch (err) {
        return err;
  
  }
}

const DataSchema = mongoose.model('dataSchema', schema);






module.exports = DataSchema;
 

