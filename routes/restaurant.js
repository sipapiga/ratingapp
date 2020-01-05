const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
});

const Joi = require('@hapi/joi');

function validationError(data) {
    let schema = Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.string().required(),
        phonenumber: Joi.string().required(),
        location: Joi.string().required(),
        category: Joi.string().required(),
    });
    return schema.validate(data);
}
const db = require('../util/database');

router.get('/', (req, res) => {
    res.render('restaurant/createrestaurant', { title: 'home' });
});

router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.body);
    let { error } = await validationError(req.body);
    if (error) {
        res.render('restaurant/createrestaurant', { error: error.details[0].message, title: 'home' });
    } else {
        if (req.file) {
            console.log(req.file);
            console.log('Uploading file...');
            var profileimage = req.file.filename;
        } else {
            console.log('No file upload...');
            var profileimage = 'noimage.jpg';
        }
        let sql = 'INSERT INTO restaurang SET ?';
        const restaurang = {
            name: req.body.name,
            price: req.body.price,
            phonenumber: req.body.phonenumber,
            location: req.body.location,
            image: profileimage,
            category: req.body.category
        };
        try {

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