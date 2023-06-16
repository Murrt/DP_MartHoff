const xml2js = require('xml2js');
const parser = new xml2js.Parser()
const mysql = require('mysql');
const Validator = require('jsonschema').Validator;
const v = new Validator();

// sql pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dp_mart_hoff',
    port: 3306
})

function executeQuery(req, res, query, isFetchAll, params = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            connection.query(query, params, (err, rows) => {
                connection.release();
                resolve(rows);
            });
        });
    });
}

function parseXML(xml) {
    return new Promise((resolve, reject) => {
        parser.parseString(xml, function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}


function validateJSON(json, schema) {
    const validationResult = v.validate(json, schema);
    return validationResult.errors.map(error => error.stack);
}



module.exports = {
    executeQuery,
    parseXML,
    validateJSON
};
