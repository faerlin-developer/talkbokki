const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/public/login.html`);
});

/* The azure runtime will fill in the value of process.env.PORT */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});