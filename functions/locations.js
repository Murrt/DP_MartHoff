const { executeQuery } = require('./utils');


// Haal een specifieke locatie op op basis van de opgegeven LocationCity in de URL parameter
async function haalSpecifiekeLocationOp(req, res, locationCity) {
    try {
        const location = await getLocationByCity(locationCity);
        if (location) {
            res.status(200).send(location);
        } else {
            res.status(404).send("Location not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
}

// Haal alle locaties op
async function haalAlleLocationsOp(req, res) {
    try {
        const allLocations = await getAllLocations();
        if (allLocations.length > 0) {
            res.status(200).send(allLocations);
        } else {
            res.status(404).send("Could not find locations");
        }
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
}

// Haal locatie op met stadsnaam
function getLocationByCity(city) {
    const query = 'SELECT * FROM locations WHERE LocationCity = ?';
    executeQuery(null, null, query, false, [city])
        .then((rows) => {
            return rows[0];
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}

// Haal alle locaties op
function getAllLocations() {
    const query = 'SELECT * FROM locations';
    return executeQuery(null, null, query, true)
        .then((rows) => {
            return rows;
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
}

// Voegt locatie toe
function addLocation(locationCity, address, state, zipcode, officephone) {
    const query = "INSERT INTO `locations` (`LocationCity`, `address`, `state`, `zipcode`, `officephone`) VALUES (?, ?, ?, ?, ?)";
    const params = [locationCity, address, state, zipcode, officephone];

    return executeQuery(null, null, query, false, params);
}

function getLocationInfo() {
    return new Promise((resolve, reject) => {
        const query = "SELECT LocationCity, COUNT(*) as employee_count FROM `personnel` INNER JOIN locations ON personnel.`LocationID` = locations.`LocationID` GROUP BY LocationCity";
        executeQuery(null, null, query)
            .then((rows) => {
                resolve(rows)
            })
            .catch((err) => {
                console.log(err)
                return err
            });
    });
}


module.exports = {
    haalSpecifiekeLocationOp,
    haalAlleLocationsOp,
    getLocationByCity,
    getAllLocations,
    addLocation,
    getLocationInfo
};
