const express = require('express');
const router = express.Router();

const db = require('../util/database');

router.get('/', (req, res) => {
    //get restautant data from db
    let sqldata = 'SELECT * FROM restaurang';
    db.query(sqldata, (err, result) => {
        if (err) throw err;
        res.render('index', { datas: result, title: 'home' });
    })
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    //get restautant data from db
    let sqldata = 'SELECT * FROM restaurang';
    db.query(sqldata, (err, result) => {
        if (err) throw err;
        res.render('index', { datas: result, title: 'home' });
    })

});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login');
}

module.exports = router;