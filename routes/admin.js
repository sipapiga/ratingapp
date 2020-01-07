const express = require('express');
const router = express.Router();
const db = require('../util/database');
const isAuth = require('../middleware/is_auth');
const isAdmin = require('../middleware/admin_only');

router.get('/', isAuth, isAdmin, async (req, res) => {
    let sql = 'SELECT * FROM restaurang ORDER BY name ASC';
    await db.query(sql, function (err, rows) {
        if (err) throw err;
        res.render('admin/admin', { title: 'admin', datas: rows });
    });
});

router.get('/:id/edit', isAuth, isAdmin, async (req, res) => {
    let sql = 'SELECT * FROM restaurang WHERE id = ?';
    try {
        const restaurant = await db.query(sql, [req.params.id], function (err, rows) {
            if (err) throw err;
            if (!restaurant)
                return res.status(404).send("The restaurant with given ID was not found");
            res.status(200).send(rows);
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.delete("/delete/:id", isAuth, isAdmin, async (req, res) => {
    let sql = 'DELETE FROM restaurang WHERE id = ?';
    try {
        await db.query(sql, [req.params.id], function (err, rows) {
            if (err) throw err;
            res.status(200).send(rows);
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

router.post("/edit/:id", isAuth, isAdmin, async (req, res) => {
    let sql = 'UPDATE restaurang  SET ? WHERE id = ?';
    const restaurang = {
        name: req.body.name,
        price: req.body.price,
        phonenumber: req.body.phonenumber,
        location: req.body.location,
        category: req.body.category
    };
    try {
        await db.query(sql, restaurang, [req.params.id], function (err, rows) {
            console.log(rows);
            if (err) throw err;
            res.status(200).send(rows);
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});


module.exports = router;