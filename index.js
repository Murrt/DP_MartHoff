// initialiseer server/validator

const Validator = require('jsonschema').Validator;
const v = new Validator();

const express = require('express');
const app = express();
const PORT = 8080;

var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser()

var xsd = require('libxmljs2-xsd');

const xmlparser = require('express-xml-bodyparser')

const mysql = require('mysql')

app.use(express.json());
app.use(xmlparser());

app.listen(
    PORT,
    () => console.log('Server is live! localhost:/' + PORT)
);

var fs = require('fs');


// sql pool

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'csv_db 9'
})



// Schema waarmee we gaan valideren of de ingevoerde JSON correct is.

var schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "ssn": {
            "type": "string",
            "maxLength": 12,
            "minLenght": 10,
            "description": "Social security number"
        },
        "lastname": {
            "type": "string",
            "description": "Last name"
        },
        "firstname": {
            "type": "string",
            "description": "First name"

        },
        "hiredate": {
            "type": "string",
            "format": "date",
            "description": "Date of hiring"
        },
        "salary": {
            "type": "string",
            "description": "Current salary"
        },
        "gender": {
            "type": "string",
            "description": "Gender"
        },
        "performance": {
            "type": "string",
            "description": "Work perfomance of the last year"
        },
        "position": {
            "type": "string",
            "description": "Position within the company"
        },
        "location": {
            "type": "string",
            "description": "City the company is based in"
        }
    },
    "required": [
        "ssn",
        "lastname",
        "firstname",
        "hiredate",
        "salary",
        "gender",
        "performance",
        "position",
        "location"
    ]
};

// getUsers haalt alle users op of 1 specefieke

// Als je de query leegt laat haalt hij alle users op.
app.get('/getUsers', function (req, res) {
    if (Object.keys(req.query)[0] == null) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            // query
            connection.query('SELECT * from personeelsdata_mart_hoff_goede', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    // 200 OK Indicates that the request has succeeded.
                    res.status(200).send(rows);
                } else {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end(err);
                }
            })
        })
        // als je in de query een ssn nummer mee geeft wordt 1 specifieke User opgehaald
    } else {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query('SELECT * from personeelsdata_mart_hoff_goede WHERE SSN = "' + Object.keys(req.query)[0] + '"', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    // 200 OK Indicates that the request has succeeded.
                    res.status(200).send(rows);
                } else {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end(err);
                }
            })
        })
    }
});

// addUser voegt een User toe aan de JSON
app.post('/addUserJSON', function (req, res) {
    const {
        body
    } = req;
    if (body !== null) {
        res.end("Enter SSN");
    } else {
        // valideer de body tegen het JSON schema
        if (v.validate(body, schema)) {
            // lees de huidige file in
            pool.getConnection((err, connection) => {
                if (err) throw err
                console.log('connected as id ' + connection.threadId)
                connection.query('INSERT INTO `personeelsdata_mart_hoff_goede` (`SSN`, `lastname`, `firstname`, `hiredate`, `salary`, `gender`, `performance`, `position`, `location`) VALUES ("' + req.body.ssn + '", "' + req.body.lastname + '", "' + req.body.firstname + '", "' + req.body.hiredate + '", "' + req.body.salary + '", "' + req.body.gender + '", "' + req.body.performance + '", "' + req.body.position + '", "' + req.body.location + '");', (err, rows) => {
                    connection.release() // return the connection to pool
                    if (!err) {
                        // 200 OK Indicates that the request has succeeded.
                        res.status(200).send("User added");
                    } else {
                        // 404 Not Found The server can not find the requested resource.
                        res.status(404).end(err);
                        console.log(err)
                    }
                })
            })
        }
    }
})

app.delete('/deleteUser', function (req, res) {
    if (Object.keys(req.query)[0] !== null) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            // console.log('connected as id ' + connection.threadId)
            connection.query('DELETE FROM `personeelsdata_mart_hoff_goede` WHERE `personeelsdata_mart_hoff_goede`.`SSN` = ' + Object.keys(req.query)[0] + '', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    // 200 OK Indicates that the request has succeeded.
                    res.status(200).send("User deleted");
                } else {
                    // 204 Not Found The server can not find the requested resource.
                    res.status(204).end(err);
                    console.log(err)
                }
            })
        })
        // als je in de query een ssn nummer mee geeft wordt 1 specifieke User opgehaald
    } else {
        res.status(404).end("Enter SSN");
        console.log("Enter SSN")
    }
});


// addUser voegt een User toe aan de XML
app.post('/addUserXML', function (req, res) {
    body = req.rawBody;
    // schema validatie 
    schemaPath = "pesoneels_data_scheme.xsd";
    var schema = xsd.parseFile(schemaPath);
    var validationErrors = schema.validate(body);
    parser.parseString(body, function (err, result) {
        // valideer de body tegen het xml schema
        if (validationErrors == null) {
            // lees de huidige file in
            pool.getConnection((err, connection) => {
                if (err) throw err
                console.log('connected as id ' + connection.threadId)
                connection.query('INSERT INTO `personeelsdata_mart_hoff_goede` (`SSN`, `lastname`, `firstname`, `hiredate`, `salary`, `gender`, `performance`, `position`, `location`) VALUES ("' + result.row.ssn[0] + '", "' + result.row.lastname[0] + '", "' + result.row.firstname[0] + '", "' + result.row.hiredate[0] + '", "' + result.row.salary[0] + '", "' + result.row.gender[0] + '", "' + result.row.performance[0] + '", "' + result.row.position[0] + '", "' + result.row.location[0] + '");', (err, rows) => {
                    connection.release() // return the connection to pool
                    if (!err) {
                        // 200 OK Indicates that the request has succeeded.
                        res.status(200).send("User added");
                    } else {
                        // 404 Not Found The server can not find the requested resource.
                        res.status(404).end(err);
                        console.log(err)
                    }
                })
            })
        } else {
            // 400 Bad Request The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
            res.status(400).end("Incorrect XML");
        }
    });
})