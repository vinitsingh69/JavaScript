const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const DataSchema = require('./models/dataSchema');


passport.use(new LocalStrategy(async (username, password, done) => {
    
    try {
        const user = await DataSchema.findOne({ username: username });
        if(!user) {
            return done(null, false, { message: 'Incorrect email' });
        }
        const iscoorectpswd = await user.comparePswd(password);
        if(iscoorectpswd) {
            return done(null, user);
        }
        else {
            
            return done(null, false, { message: 'Incorrect password' });
        }
        
        
    }   catch (err) {
        return done(err); 
    }
}))

module.exports = passport;