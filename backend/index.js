const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

require('dotenv').config();

const shortenRoute = require('./routes/shorten');
const redirectRoute = require('./routes/redirect');

app.use('/', shortenRoute);
app.use('/', redirectRoute);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log('Server started on port 8000');
});
