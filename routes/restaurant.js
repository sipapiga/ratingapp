const express = require('express');
const router = express.Router();

const Joi = require('@hapi/joi');

function validationError(data) {
    let schema = Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.string().required(),
        phonenumber: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().required(),
        category: Joi.string().required(),
    });
    return schema.validate(data);
}
const db = require('../util/database');

router.get('/', (req, res) => {
    res.render('restaurant/createrestaurant', { title: 'home' });
});

router.post('/', async (req, res) => {
    console.log(req.body);
    let { error } = await validationError(req.body);
    if (error) {
        res.render('restaurant/createrestaurant', { error: error.details[0].message, title: 'home' });
    } else {
        try {
            let sql = 'INSERT INTO restaurang SET ?';
            const restaurang = {
                name: req.body.name,
                price: req.body.price,
                phonenumber: req.body.phonenumber,
                location: req.body.location,
                image: req.body.image,
                category: req.body.category
            };
            console.log(restaurang);

            let restaurant = await db.query(sql, restaurang, (err, result) => {
                if (err) throw err;
                console.log(result);
                //  res.status(200).send(restaurant);
            });
            res.redirect('/dashboard');
        } catch (error) {
            res.status(400).send({ error: error.details[0].message });
        }
    }
});
//Get best rating restaurants
router.get('/best-resting', async (req, res) => {
    let sql = 'SELECT * FROM restaurang ORDER BY rating DESC LIMIT 10';
    await db.query(sql, function (err, rows) {
        if (err) throw err;
        res.status(200).render('index', { title: 'home', datas: rows });
    });
});

//Get best rating restaurants
router.get('/category', async (req, res) => {
    let sql = 'SELECT * FROM restaurang ORDER BY category ASC';
    await db.query(sql, function (err, rows) {
        if (err) throw err;
        res.status(200).render('index', { title: 'home', datas: rows });
    });
});



module.exports = router;