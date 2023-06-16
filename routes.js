const express = require('express');
const router = express.Router();
const app = require('./server');

app.get('/', (req, res) => {
    res.render('menu');
})

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// Routing naar de verschillende pagina's
app.get('/visualisatie1', function (req, res) {
    res.render('visualisatie1');
});

app.get('/visualisatie2', function (req, res) {
    res.render('visualisatie2');
});

module.exports = router;
