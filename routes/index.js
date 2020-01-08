const express = require('express');
const router = express.Router();

const db = require('../util/database');
const isAuth = require('../middleware/is_auth');

router.get('/', async (req, res) => {
    //get restautant data from db
    let sqldata = 'SELECT * FROM restaurang';
    try {
        await db.query(sqldata, (err, result) => {
            if (err) throw err;
            //  res.status(200).send(result);

            /*    let categoryArr = result.map(function (restaurang) {
                   return restaurang.category;
               })
   
               const category = categoryArr.filter(function (value, index) {
                   return (categoryArr.indexOf(value) == index);
               });
    */
            res.render('index', { datas: result, title: 'home', categories: getCategory(result) });
        });
    } catch (error) {
        res.status(400).send({ error: error.details[0].message });
    }
});

router.get('/dashboard', isAuth, async (req, res) => {
    console.log(req.user);
    //get restautant data from db
    let sqldata = 'SELECT * FROM restaurang';
    try {
        await db.query(sqldata, (err, result) => {
            if (err) throw err;
            // res.status(200).send(result);
            res.render('index', { datas: result, title: 'home', categories: getCategory(result) });
        })
    } catch (error) {
        res.status(400).send({ error: error.details[0].message });
    }

});

function getCategory(result) {
    let categoryArr = result.map(function (restaurang) {
        return restaurang.category;
    })
    const category = categoryArr.filter(function (value, index) {
        return (categoryArr.indexOf(value) == index);
    });
    return category;
}

module.exports = router;