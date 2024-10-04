const express = require('express');
const router = express.Router();
const db = require('../db/database.js');
const redisClient = require('../db/redis.js');

router.get('/:code', async (req, res) => {
    const code = req.params.code;

    const cachedLink = await redisClient.get(code);
    if (cachedLink) {
        // console.log("from cache");
        return res.redirect(cachedLink);
    } 

    db.query('SELECT l.link FROM links l INNER JOIN alias a ON a.link_id = l.id WHERE a.alias = ?', [code], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const link = result[0].link;

            redisClient.set(code, link, 'EX', 3600);
            return res.redirect(link);
        } else {
            res.status(404).send("Error: Code not found");
        }
    });
});

module.exports = router;
