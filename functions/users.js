const { executeQuery, parseXML, validateJSON } = require('./utils');

const xml2js = require('xml2js');

const builder = require('xmlbuilder2');

// Haal een specifieke user op op basis van het opgegeven SSN in de route parameter
function haalSpecifiekeuserOp(req, res) {
    const ssn = req.params.ssn;
    const query = 'SELECT * FROM personnel WHERE SSN = ?';
    executeQuery(req, res, query, false, [ssn]);
}

// Haal alle users op
function haalAlleusersOp(req, res) {
    const query = 'SELECT * FROM personnel';
    executeQuery(req, res, query, true);
}


function haalAlleusersOpXML(req, res) {
    executeQuery(req, res, 'SELECT * FROM personnel', true)
        .then((rows) => {
            const xml = buildXML(rows);
            res.status(200).send(xml);
        })
        .catch((err) => {
              console.error(err);
              res.status(500).send("Internal Server Error");
        });
}

function buildXML(data) {
    const builder = new xml2js.Builder();
    const xmlObject = {
        users: {
            user: data.map((row) => ({
                ssn: row.SSN,
                lastname: row.lastname,
                firstname: row.firstname,
                hiredate: row.hiredate,
                maxSalary: row.maxSalary,
                gender: row.gender,
                performance: row.performance,
                position: row.position,
                location: row.location
            }))
        }
    };
    return builder.buildObject(xmlObject);
}


function insertUserIntoDatabase(user, type) {
    const query = "INSERT INTO `personnel` (`SSN`, `lastname`, `firstname`, `hiredate`, `salary`, `gender`, `performance`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    let params;
    if (type == 'xml') {
        params = [
            user.ssn[0],
            user.lastname[0],
            user.firstname[0],
            user.hiredate[0],
            user.salary[0],
            user.gender[0],
            user.performance[0],
        ];
    } else if ('json') {
        params = [
            user.ssn,
            user.lastname,
            user.firstname,
            user.hiredate,
            user.salary,
            user.gender,
            user.performance,
        ];
    }

    return executeQuery(null, null, query, false, params);
}



function checkUserExistence(ssn) {
    const query = "SELECT * FROM `personnel` WHERE `personnel`.`SSN` = ?";
    const params = [ssn];

    return executeQuery(null, null, query, true, params)
}

function deleteUserFromDatabase(ssn) {
    const query = 'DELETE FROM `personnel` WHERE `personnel`.`SSN` = ?';
    return executeQuery(null, null, query, false, [ssn])
}

module.exports = {
    haalSpecifiekeuserOp,
    haalAlleusersOp,
    haalAlleusersOpXML,
    buildXML,
    insertUserIntoDatabase,
    checkUserExistence,
    deleteUserFromDatabase
};
