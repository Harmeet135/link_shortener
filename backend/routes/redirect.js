const express = require('express');
const router = express.Router();

const db = require('../db/database.js');

router.get('/:code', (req, res) => {
    db.query('SELECT l.link FROM links l INNER JOIN alias a ON a.link_id = l.id WHERE a.alias = ?', [req.params.code], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.redirect(result[0].link);
        } else {
            res.status(404).send("Error: Code not found");
        }
    });
});

module.exports = router;
