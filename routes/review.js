const express = require('express');
const router = express.Router();

const db = require('../util/database');
//Read
router.get('/restaurant/:id', (req, res) => {
    let star = 0;
    let average = 0;
    let sql = 'SELECT * FROM review INNER JOIN restaurang ON review.restaurang_id = restaurang.id WHERE restaurang.id=?';
    db.query(sql, [req.params.id], function (err, rows) {
        if (err) throw err;
        rows.forEach((row) => {
            star += row.userrating;
        });
        //antalet star / antalet reviews
        average = star / rows.length;
        if (!isNaN(average)) {
            let sqlrating = 'UPDATE restaurang SET rating = ? WHERE id = ?;'
            db.query(sqlrating, [average, req.params.id], function (err, rows) {
                if (err) throw err;
                console.log(rows);
            });

        }
        res.status(200).render('readreview', { title: 'home', data: rows, rating: average, star: star });
    });
});

router.get('/:id', (req, res) => {
    db.query('select * from restaurang where id = ? ', [req.params.id], function (err, rows) {
        if (err) throw err;
        res.status(200).render('review', { title: 'home', data: rows[0], user: req.user });
    });

});
//Create
router.post('/:id', async (req, res) => {
    console.log(req.body);
    let sql = 'INSERT INTO review SET ?';
    const review = {
        reviewer: req.body.sender,
        review: req.body.review,
        restaurang_id: req.params.id,
        userrating: req.body.clickedValue
    };
    try {
        console.log(req.params.id);
        await db.query(sql, review, function (err, rows) {
            if (err) throw err;
            console.log(rows[0]);
        });

    } catch (error) {
        res.status(400).send({ error: error.details[0].message });
    }

    //res.redirect(`/restaurang/${req.params.id}`);
});


module.exports = router;