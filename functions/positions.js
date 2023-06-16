const { executeQuery } = require('./utils');

// Haal een specifieke positie op op basis van de opgegeven PositionTitle in de URL parameter
async function haalSpecifiekePositionOp(req, res, positionTitle) {
    try {
        const position = await getPositionByTitle(positionTitle);
        if (position) {
            res.status(200).send(position);
        } else {
            res.status(404).send("Position not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
}

// Haalt alle posities op
async function getAllPositions() {
    const query = 'SELECT * FROM positions';
    return executeQuery(null, null, query, true)
        .then((rows) => {
            return rows;
        })
        .catch((err) => {
            throw err;
        });
}

// Haalt positie op met title
async function getPositionByTitle(title) {
    const query = 'SELECT * FROM positions WHERE PositionTitle = ?';
    return executeQuery(null, null, query, false, [title])
        .then((rows) => {
            return rows[0];
        })
        .catch((err) => {
            throw err;
        });
}

// Voegt positie toe
function addPosition(positionTitle, education, minSalary, maxSalary) {
    const query = "INSERT INTO `positions` (`PositionTitle`, `education`, `minSalary`, `maxSalary`) VALUES (?, ?, ?, ?)";
    const params = [positionTitle, education, minSalary, maxSalary];

    return executeQuery(null, null, query, false, params);
}

// Haal alle locaties op
async function haalAllePositiesOp(req, res) {
    try {
        const allLocations = await getAllPositions();
        if (allLocations.length > 0) {
            res.status(200).send(allLocations);
        } else {
            res.status(404).send("Could not find positions");
        }
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
}


module.exports = {
    haalSpecifiekePositionOp,
    getAllPositions,
    getPositionByTitle,
    haalAllePositiesOp,
    addPosition
};