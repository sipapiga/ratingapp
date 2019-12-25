const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

const db = require('../util/sqlconnect');

const Joi = require('@hapi/joi');

function validationError(data) {
    let schema = Joi.object().keys({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required(),
        repeat_password: Joi.ref('password'),
    });
    return schema.validate(data);
}

router.get('/register', (req, res) => {
    res.render('register', { title: 'register' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'login', message: req.flash('loginMessage') });
});

router.get('/home', (req, res) => {
    res.render('home', { title: 'login' });
});

router.post('/register', async (req, res) => {
    console.log(req.body);
    let { error } = await validationError(req.body);
    if (error) {
        res.render('register', { error: error.details[0].message, title: 'register' });
    } else {

        let name = req.body.name;
        let email = req.body.email;
        let username = req.body.username;
        let password = req.body.password;

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
        let sql = 'INSERT INTO user SET ?';
        const user = {
            name: name,
            email: email,
            username: username,
            password: hashPass
        };

        console.log(user);

        let saveUser = db.query(sql, user, (err, result) => {
            if (err) throw err;
            console.log(result);
            //  res.send('Restaurang inserted...')
        });

        req.flash('success_msg', 'You are now registered and can login');
        res.location('/user/login');
        res.redirect('/user/login');
    }

    //login user route
    router.post('/loginuser', passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true
    }));

    router.get('/logout', (req, res) => {
        req.logOut();
        req.flash('success_msg', 'You are now logged out');
        res.redirect('/user/login');
    })

});

module.exports = router;