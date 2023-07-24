const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
//   });
  
// db.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to database');
// });

// Import the route handlers from the "routes" folder
const shortenRoute = require('./routes/shorten');
const redirectRoute = require('./routes/redirect');

// Use the route handlers
app.use('/', shortenRoute);
app.use('/', redirectRoute);

// function generateShortCode() {
//     return crypto.randomBytes(3).toString('base64').replace(/\+/g, '0').replace(/\//g, '0');
// }

// async function checkAlias(code) {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * FROM alias WHERE alias = ?', [code], (err, result) => {
//             if (err) reject(err);
//             if (result.length > 0) {
//                 code = generateShortCode();
//                 resolve(checkAlias(code));
//             } else {
//                 resolve(code);
//             }
//         });
//     });
// }

// app.post('/', async (req, res) => {
//     if (!req.body.url) {
//         res.status(400).send("Error: 'url' is not set in the received data.");
//         return;
//     }

//     let url = req.body.url;
//     if (!/^https?:\/\//i.test(url)) {
//         url = 'http://' + url;
//     }

//     let code = generateShortCode();
//     code = await checkAlias(code);

//     db.query('INSERT INTO links (link) VALUES (?)', [url], (err, result) => {
//         if (err) throw err;
//         const link_id = result.insertId;

//         db.query('INSERT INTO alias (link_id, alias) VALUES (?, ?)', [link_id, code], (err) => {
//             if (err) throw err;
//             res.send(code);
//         });
//     });
// });

// app.get('/:code', (req, res) => {
//     db.query('SELECT l.link FROM links l INNER JOIN alias a ON a.link_id = l.id WHERE a.alias = ?', [req.params.code], (err, result) => {
//         if (err) throw err;
//         if (result.length > 0) {
//             res.redirect(result[0].link);
//         } else {
//             res.status(404).send("Error: Code not found");
//         }
//     });
// });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8000, () => {
    console.log('Server started on port 8000');
});
