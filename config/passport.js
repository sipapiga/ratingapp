const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const db = require('../util/database');

function initialize(passport) {
    const authenticateUser = (username, password, done) => {
        console.log(username + ':' + password);
        db.query("SELECT * FROM user WHERE username = ?", [username], function (err, rows) {
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false, {
                    message: 'Username is not found'
                });// req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password))
                return done(null, false, {
                    message: 'Invalid password'
                }); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            console.log(rows[0]);
            return done(null, rows[0]);
        });
    }
    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        db.query("select * from user where id = ? ", [id], function (err, rows) {
            return done(err, rows[0]);
        });
    });
}

module.exports = initialize;