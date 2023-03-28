// initialiseer server/validator

const Validator = require('jsonschema').Validator;
const v = new Validator();
const express = require('express');
const app = express();
const PORT = 8080;
var xml2js = require('xml2js');
var parser = new xml2js.Parser()
const mysql = require('mysql');
// var xsd = require('libxmljs2-xsd');
const xmlparser = require('express-xml-bodyparser')

const router = express.Router();



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

// sql pool

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dp_mart_hoff',
    port: 3306
})


app.get('/', (req, res) => {
    res.send('GET request to the homepage')
})

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/vis1', function (req, res) {
    res.render('visualisatie1');
});


app.get('/vis2', function (req, res) {
    res.render('visualisatie2');
});


app.get('/vis3', function (req, res) {
    res.render('visualisatie3');
});

module.exports = router;



// Schema waarmee we gaan valideren of de ingevoerde JSON correct is.

var UserJSONschema = {
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
            "type": "double",
            "minLength": 0,
            "maxLength": 9999999,
            "description": "Current salary"
        },
        "gender": {
            "type": "string",
            "minLength": 0,
            "maxLength": 2,
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

var LocationJSONschema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "LocationCity": {
            "type": "string",
            "maxLength": 255,
            "minLenght": 0,
            "description": "Name of the city"
        },
        "address": {
            "type": "string",
            "maxLength": 255,
            "minLenght": 0,
            "description": "Street name and number"
        },
        "state": {
            "type": "string",
            "maxLength": 4,
            "minLenght": 2,
            "description": "State"
        },
        "zipcode": {
            "type": "string",
            "minLength": 0,
            "maxLength": 8,
            "description": "zipcode"
        },
        "officephone": {
            "type": "string",
            "minLength": 6,
            "maxLength": 15,
            "description": "Telephone number of the office in this location"
        }
    },
    "required": [
        "LocationCity",
        "address",
        "state",
        "zipcode",
        "officephone"
    ]
};

var PositionJSONschema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "PositionTitle": {
            "type": "string",
            "maxLength": 255,
            "minLenght": 0,
            "description": "Name of the title"
        },
        "education": {
            "type": "string",
            "maxLength": 255,
            "minLenght": 0,
            "description": "name of the education"
        },
        "minSalary": {
            "type": "integer",
            "maxLength": 99999999999,
            "minLenght": 0,
            "description": "minimum salary"
        },
        "maxSalary": {
            "type": "integer",
            "maxLength": 99999999999,
            "minLenght": 0,
            "description": "maximum salary"
        }
    },
    "required": [
        "PositionTitle",
        "education",
        "minSalary",
        "maxSalary",
    ]
};

// getUsers haalt alle users op of 1 specefieke

// Als je de query leegt laat haalt hij alle users op.
app.get('/getUsers', function (req, res) {
    if (Object.keys(req.query)[0] == null) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            // query
            connection.query('SELECT * from personeelsdata', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    // 200 OK Indicates that the request has succeeded.
                    if (rows !== null) {
                        res.status(200).send(rows);
                    } else {
                        res.status(404).send("No user found");
                    }
                } else {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end(err.sqlMessage);
                }
            })
        })
        // als je in de query een ssn nummer mee geeft wordt 1 specifieke User opgehaald
    } else {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query('SELECT * from personeelsdata WHERE SSN = ?', [Object.keys(req.query)[0]], (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    // 200 OK Indicates that the request has succeeded.
                    res.status(200).send(rows);
                } else {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end(err.sqlMessage);
                }
            })
        })
    }
});

// addUser voegt een User toe 
app.post('/addUser', function (req, res) {
    body = req.rawBody;
    // Invoer data type XML
    if (req.get('data-type') == 'XML') {
        // Lees schema in
        schemaPath = "xsd_schemes/personeels_data_scheme.xsd";
        var XMLschema = xsd.parseFile(schemaPath);
        var validationErrors = XMLschema.validate(body);
        parser.parseString(body, function (err, result) {
            // valideer de body tegen het xml schema
            if (validationErrors == null) {
                // lees de huidige file in
                pool.getConnection((err, connection) => {
                    if (err) throw err
                    console.log('connected as id ' + connection.threadId)
                    connection.query('INSERT INTO `personeelsdata` (`SSN`, `lastname`, `firstname`, `hiredate`, `salary`, `gender`, `performance`, `position`, `location`) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,?);', [result.row.ssn[0], result.row.lastname[0], result.row.firstname[0], result.row.hiredate[0], result.row.salary[0], result.row.gender[0], result.row.performance[0], result.row.position[0], result.row.location[0]], (err, rows) => {
                        connection.release() // return the connection to pool
                        if (!err) {
                            // 200 OK Indicates that the request has succeeded.
                            res.status(200).send("User added, ssn:" + result.row.ssn[0]);
                        } else {
                            // 404 Not Found The server can not find the requested resource.
                            res.status(404).end(err);
                            console.log(err.sqlMessage)
                        }
                    })
                })
            } else {
                // 400 Bad Request The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
                res.status(400).end("Incorrect XML");
            }
        });
        // Invoer data type JSON
    } else if (req.get('data-type') == 'JSON') {
        // valideer de body tegen het JSON schema
        user_validation = v.validate(req.body, UserJSONschema)
        if (user_validation['errors'].length == 0) {
            // lees de huidige file in
            pool.getConnection((err, connection) => {
                if (err) throw err
                connection.query('INSERT INTO `personeelsdata` (`SSN`, `lastname`, `firstname`, `hiredate`, `salary`, `gender`, `performance`, `position`, `location`) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,?);', [req.body.ssn, req.body.lastname, req.body.firstname, req.body.hiredate, req.body.salary, req.body.gender, req.body.performance, req.body.position, req.body.location], (err, rows) => {
                    connection.release() // return the connection to pool
                    if (!err) {
                        // 200 OK Indicates that the request has succeeded.
                        res.status(200).send("User added, ssn:" + req.body.ssn);
                    } else {
                        // 404 Not Found The server can not find the requested resource.
                        res.status(404).end(err.sqlMessage);
                    }
                })
            })
        }
    } else {
        // 400 Bad Request The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
        res.status(400).end("Bad request, check if data-type is entered in header field");
    }
})


// Delete user endpoint 
app.delete('/deleteUser', function (req, res) {
    // check of ssn is ingevult
    if (Object.keys(req.query)[0] !== null) {
        pool.getConnection((err, connection) => {
            connection.query('SELECT * FROM `personeelsdata` WHERE `personeelsdata`.`SSN` = ?', [Object.keys(req.query)[0]], (err, rows) => {
                if (!err) {
                    if (rows.length != 0) {
                        console.log(rows)
                        connection.query('DELETE FROM `personeelsdata` WHERE `personeelsdata`.`SSN` = ?', [Object.keys(req.query)[0]], (error, rows) => {
                            connection.release() // return the connection to pool
                            if (!error) {
                                // 200 OK Indicates that the request has succeeded.
                                res.status(200).send("User deleted, ssn:" + Object.keys(req.query)[0]);
                            } else {
                                // 404 Not Found The server can not find the requested resource.
                                res.status(404).end(error.sqlMessage);
                            }
                        })
                    } else {
                        // 204 Not Found The server can not find the requested resource.
                        res.status(404).send("No user found");
                    }
                } else {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end(err.sqlMessage);
                }
            })
        })
    } else {
        res.status(404).end("Enter SSN");
    }
});

// get Locations haalt alle locations op of 1 specifieke

// Als je de query leegt laat haalt hij alle locations op.
app.get('/getLocation', function (req, res) {
    if (Object.keys(req.query)[0] == null) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            // query
            connection.query('SELECT * from locations', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    // 200 OK Indicates that the request has succeeded.
                    if (rows !== null) {
                        res.status(200).send(rows);
                    } else {
                        res.status(404).send("Could not find locations");
                    }
                } else {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end(err.sqlMessage);
                }
            })
        })
        // als je in de query een LocationCity nummer mee geeft wordt 1 specifieke User opgehaald
    } else {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query('SELECT * from locations WHERE LocationCity = ?', [Object.keys(req.query)[0]], (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    // 200 OK Indicates that the request has succeeded.
                    res.status(200).send(rows);
                } else {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end(err.sqlMessage);
                }
            })
        })
    }
});

// get Positions haalt alle posities op of 1 specifieke
// Als je de query leegt laat haalt hij alle positions op.
app.get('/getPosition', function (req, res) {
    if (Object.keys(req.query)[0] == null) {
        pool.getConnection((err, connection) => {
            if (err) throw err
            // query
            connection.query('SELECT * from positions', (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    // 200 OK Indicates that the request has succeeded.
                    if (rows !== null) {
                        res.status(200).send(rows);
                    } else {
                        res.status(404).send("Could not find location");
                    }
                } else {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end(err.sqlMessage);
                }
            })
        })
        // als je in de query een positie title mee geeft wordt 1 specifieke positie opgehaald
    } else {
        pool.getConnection((err, connection) => {
            if (err) throw err
            connection.query('SELECT * from positions WHERE PositionTitle = ?', [Object.keys(req.query)[0]], (err, rows) => {
                connection.release() // return the connection to pool
                if (!err) {
                    if (rows !== null) {
                        res.status(200).send(rows);
                    } else {
                        res.status(404).send("No position found");
                    }
                } else {
                    // 404 Not Found The server can not find the requested resource.
                    res.status(404).end(err.sqlMessage);
                }
            })
        })
    }
});

// addLocation voegt een Location toe 
app.post('/addLocation', function (req, res) {
    body = req.rawBody;
    // Invoer data type XML
    if (req.get('data-type') == 'XML') {
        // Lees schema in
        schemaPath = "xsd_schemes/location_data_scheme.xsd";
        var XMLschema = xsd.parseFile(schemaPath);
        var validationErrors = XMLschema.validate(body);
        parser.parseString(body, function (err, result) {
            // valideer de body tegen het xml schema
            if (validationErrors == null) {
                // lees de huidige file in
                pool.getConnection((err, connection) => {
                    if (err) throw err
                    connection.query('INSERT INTO `locations` (`LocationCity`, `address`, `state`, `zipcode`, `officephone`) VALUES (?, ? ,? ,? ,?);', [result.row.LocationCity[0], result.row.address[0], result.row.state[0], result.row.zipcode[0], result.row.officephone[0]], (err, rows) => {
                        connection.release() // return the connection to pool
                        if (!err) {
                            // 200 OK Indicates that the request has succeeded.
                            res.status(200).send("Location added added: " + result.row.LocationCity[0]);
                        } else {
                            // 404 Not Found The server can not find the requested resource.
                            res.status(404).end(err);
                        }
                    })
                })
            } else {
                // 400 Bad Request The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
                res.status(400).end("Incorrect XML");
            }
        });
        // Invoer data type JSON
    } else if (req.get('data-type') == 'JSON') {
        // valideer de body tegen het JSON schema
        location_validation = v.validate(req.body, LocationJSONschema)
        if (location_validation['errors'].length == 0) {
            // lees de huidige file in
            pool.getConnection((err, connection) => {
                if (err) throw err
                connection.query('INSERT INTO `locations` (`LocationCity`, `address`, `state`, `zipcode`, `officephone`) VALUES (?, ? ,? ,? ,?);', [req.body.LocationCity, req.body.address, req.body.state, req.body.zipcode, req.body.officephone], (err, rows) => {
                    connection.release() // return the connection to pool
                    if (!err) {
                        // 200 OK Indicates that the request has succeeded.
                        res.status(200).send("Location added, city:" + req.body.LocationCity);
                    } else {
                        // 404 Not Found The server can not find the requested resource.
                        res.status(404).end(err.sqlMessage);
                    }
                })
            })
        } else {
            // 400 Bad Request The request could not `be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
            res.status(400).end("Incorrect JSON");
            ``
        }
    } else {
        // 400 Bad Request The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
        res.status(400).end("Bad request, check if data-type is entered in header field");
    }
})



// addPosition voegt een position toe 
app.post('/addPosition', function (req, res) {
    body = req.rawBody;

    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM `positions` WHERE `PositionTitle` = ?', [req.body.PositionTitle], (err, rows) => {
            if (!err) {
                // duplicate check
                if (rows.length == 0) {
                    // Invoer data type XML
                    if (req.get('data-type') == 'XML') {
                        // Lees schema in
                        schemaPath = "xsd_schemes/position_data_scheme.xsd";
                        var XMLschema = xsd.parseFile(schemaPath);
                        var validationErrors = XMLschema.validate(body);
                        parser.parseString(body, function (err, result) {
                            // valideer de body tegen het xml schema
                            if (validationErrors == null) {
                                // lees de huidige file in
                                pool.getConnection((err, connection) => {
                                    if (err) throw err
                                    connection.query('INSERT INTO `positions` (`PositionTitle`, `education`, `minSalary`, `maxSalary`) VALUES (? ,? ,? ,?);', [result.row.PositionTitle[0], result.row.education[0], result.row.minSalary[0], result.row.maxSalary[0]], (err, rows) => {
                                        connection.release() // return the connection to pool
                                        if (!err) {
                                            // 200 OK Indicates that the request has succeeded.
                                            res.status(200).send("Position added, " + result.row.PositionTitle[0]);
                                        } else {
                                            // 404 Not Found The server can not find the requested resource.
                                            res.status(404).end(err);
                                        }
                                    })
                                })
                            } else {
                                // 400 Bad Request The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
                                res.status(400).end("Incorrect XML");
                            }
                        });
                        // Invoer data type JSON
                    } else if (req.get('data-type') == 'JSON') {
                        // valideer de body tegen het JSON schema
                        position_validation = v.validate(req.body, PositionJSONschema)
                        if (position_validation['errors'].length == 0) {
                            // lees de huidige file in
                            pool.getConnection((err, connection) => {
                                if (err) throw err
                                connection.query('INSERT INTO `positions` (`PositionTitle`, `education`, `minSalary`, `maxSalary`) VALUES (?, ? ,? ,?);', [req.body.PositionTitle, req.body.education, req.body.minSalary, req.body.maxSalary], (err, rows) => {
                                    connection.release() // return the connection to pool
                                    if (!err) {
                                        // 200 OK Indicates that the request has succeeded.
                                        res.status(200).send("Position added, " + req.body.PositionTitle);
                                    } else {
                                        // 404 Not Found The server can not find the requested resource.
                                        res.status(404).end(err.sqlMessage);
                                    }
                                })
                            })
                        } else {
                            // 400 Bad Request The request could not `be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
                            res.status(400).end("Incorrect JSON");

                        }
                    } else {
                        // 400 Bad Request The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.
                        res.status(400).end("Bad request, check if data-type is entered in header field");
                    }

                } else {
                    // 204  indicates a request conflict with the current state of the target resource
                    res.status(409).send("Position already registered");
                }
            } else {
                // 404 Not Found The server can not find the requested resource.
                res.status(404).end(err.sqlMessage);
            }
        })
    })

})

// getAllData haalt alle data op
app.get('/getAllData', function (req, res) {
    pool.getConnection((err, connection) => {
        if (err) throw err
        // query
        connection.query('SELECT * FROM `personeelsdata` INNER JOIN locations ON personeelsdata.`LocationID` = locations.`LocationID` INNER JOIN positions ON personeelsdata.`PositionID` = positions.`PositionID`', (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                // 200 OK Indicates that the request has succeeded.
                if (rows !== null) {
                    res.status(200).send(rows);
                } else {
                    res.status(404).send("No data found");
                }
            } else {
                // 404 Not Found The server can not find the requested resource.
                res.status(404).end(err.sqlMessage);
            }
        })
    })
});

// getLocationInfo haalt alle data op
app.get('/getLocationInfo', function (req, res) {
    pool.getConnection((err, connection) => {
        if (err) throw err
        // query
        connection.query('SELECT location, COUNT(*) as employee_count FROM `personeelsdata` INNER JOIN locations ON personeelsdata.`LocationID` = locations.`LocationID` GROUP BY location', (err, rows) => {
            connection.release() // return the connection to pool
            if (!err) {
                // 200 OK Indicates that the request has succeeded.
                if (rows !== null) {
                    res.status(200).send(rows);
                } else {
                    res.status(404).send("No data found");
                }
            } else {
                // 404 Not Found The server can not find the requested resource.
                res.status(404).end(err.sqlMessage);
            }
        })
    })
});