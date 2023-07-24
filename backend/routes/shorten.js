const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const db = require('../db/database.js');

function generateShortCode() {
    return crypto.randomBytes(3).toString('base64').replace(/\+/g, '0').replace(/\//g, '0');
}

async function checkAlias(code) {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM alias WHERE alias = ?', [code], (err, result) => {
            if (err) reject(err);
            if (result.length > 0) {
                code = generateShortCode();
                resolve(checkAlias(code));
            } else {
                resolve(code);
            }
        });
    });
}

router.post('/', async (req, res) => {
    if (!req.body.url) {
        res.status(400).send("Error: 'url' is not set in the received data.");
        return;
    }

    let url = req.body.url;
    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }

    let code = generateShortCode();
    code = await checkAlias(code);

    db.query('INSERT INTO links (link) VALUES (?)', [url], (err, result) => {
        if (err) throw err;
        const link_id = result.insertId;

        db.query('INSERT INTO alias (link_id, alias) VALUES (?, ?)', [link_id, code], (err) => {
            if (err) throw err;
            res.send(code);
        });
    });
});

module.exports = router;
