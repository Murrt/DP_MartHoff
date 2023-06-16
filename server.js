const express = require('express');
const app = express();
const PORT = 8080;

const router = express.Router();
const xmlparser = require('express-xml-bodyparser')
app.use(express.json());
app.use(xmlparser());

// CORS FIX
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type', 'Authorization');
    next();
})

app.listen(
    PORT,
    () => console.log('Server is live! http://localhost:' + PORT)
);

module.exports = app, PORT;