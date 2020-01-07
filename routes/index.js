const express = require('express');
const router = express.Router();

const db = require('../util/database');
const isAuth = require('../middleware/is_auth');

router.get('/', (req, res) => {
    //get restautant data from db
    let sqldata = 'SELECT * FROM restaurang';
    db.query(sqldata, (err, result) => {
        if (err) throw err;
        //  res.status(200).send(result);
        res.render('index', { datas: result, title: 'home' });
    })
});

router.get('/dashboard', isAuth, (req, res) => {
    console.log(req.user);
    //get restautant data from db
    let sqldata = 'SELECT * FROM restaurang';
    db.query(sqldata, (err, result) => {
        if (err) throw err;
        // res.status(200).send(result);
        res.render('index', { datas: result, title: 'home' });
    })

});

module.exports = router;