// initialiseer server/validator
const Validator = require('jsonschema').Validator;
const v = new Validator();
const xsd = require('libxmljs2-xsd');

const {
    haalSpecifiekeuserOp,
    haalAlleusersOp,
    haalAlleusersOpXML,
    insertUserIntoDatabase,
    checkUserExistence,
    deleteUserFromDatabase } = require('./functions/users');
const {
    haalSpecifiekeLocationOp,
    haalAlleLocationsOp,
    addLocation,
    getLocationInfo } = require('./functions/locations');
const {
    haalSpecifiekePositionOp,
    haalAllePositiesOp,
    addPosition
} = require('./functions/positions');

const { parseXML, validateJSON } = require('./functions/utils')

const app = require('./server');
const router = require('./routes');
const {
    UserJSONschema,
    LocationJSONschema,
    PositionJSONschema
} = require('./schemas');


// Haal alle users op of een specifieke user op basis van het SSN in de route parameter
app.get('/users/:ssn?', function (req, res) {
    const acceptHeader = req.get('Accept');
    if (acceptHeader === 'application/xml') {
        haalAlleusersOpXML(req, res);
    } else {
        if (req.params.ssn) {
            // Haal een specifieke user op op basis van het opgegeven SSN in de route parameter
            haalSpecifiekeuserOp(req, res);
        } else {
            // Haal alle users op als geen SSN is opgegeven
            haalAlleusersOp(req, res);
        }
    }
});

// Post User voegt een User toe
app.post('/user', async function (req, res) {
    const acceptHeader = req.get('Accept');

    if (acceptHeader == 'application/xml') {
        try {
            const schemaPath = "xsd_schemes/personeels_data_scheme.xsd";
            const XMLschema = xsd.parseFile(schemaPath);
            const validationErrors = XMLschema.validate(req.rawBody);
            console.log(validationErrors);
            if (validationErrors == null) {
                const result = await parseXML(req.rawBody);
                await insertUserIntoDatabase(result.row, 'xml');
                res.status(200).send("user toegevoegd, SSN: " + result.row.ssn[0]);
            } else {
                res.status(400).end("Ongeldige XML");
            }
        } catch (error) {
            console.log(error)
            res.status(500).end("Interne serverfout");
        }
    } else if (acceptHeader == 'application/json') {
        try {
            const validationErrors = validateJSON(req.body, UserJSONschema);

            console.log(validationErrors);
            if (validationErrors.length == 0) {
                await insertUserIntoDatabase(req.body, 'json');
                res.status(200).send("user toegevoegd, SSN: " + req.body.ssn);
            } else {
                res.status(400).end("JSON is onjuist");
            }
        } catch (error) {
            console.log(error)
            res.status(500).end("Interne serverfout");
        }
    } else {
        res.status(400).end("Ongeldige aanvraag, controleer of 'data-type' is ingevoerd in het header-veld");
    }
});

// Verwijderen user eindpunt
app.delete('/user/:ssn', async function (req, res) {
    const ssn = req.params.ssn;

    if (ssn) {
        try {
            const userExists = await checkUserExistence(ssn);

            if (userExists) {
                await deleteUserFromDatabase(ssn);
                res.status(200).send("User verwijderd, SSN: " + ssn);
            } else {
                res.status(404).send("Geen user gevonden");
            }
        } catch (errors) {
            console.log(errors)
            res.status(500).end("Interne serverfout");
        }
    } else {
        res.status(400).end("Voer SSN in");
    }
});

// Post Location voegt een Location toe 
app.post('/location', async function (req, res) {
    try {
        const body = req.rawBody;
        const acceptHeader = req.get('Accept');

        if (acceptHeader === 'application/xml') {
            const schemaPath = "xsd_schemes/location_data_scheme.xsd";
            const XMLschema = xsd.parseFile(schemaPath);
            const validationErrors = XMLschema.validate(body);

            if (validationErrors == null) {
                const result = await parseXML(body);
                const { LocationCity, address, state, zipcode, officephone } = result.row;

                await addLocation(LocationCity[0], address[0], state[0], zipcode[0], officephone[0]);
                res.status(200).send("Location added: " + LocationCity[0]);
            } else {
                res.status(400).end("Incorrect XML");
            }
        } else if (acceptHeader === 'application/json') {
            const locationValidation = v.validate(req.body, LocationJSONschema);

            if (locationValidation.errors.length === 0) {
                const { LocationCity, address, state, zipcode, officephone } = req.body;

                await addLocation(LocationCity, address, state, zipcode, officephone);
                res.status(200).send("Location added: " + LocationCity);
            } else {
                res.status(400).end("Incorrect JSON");
            }
        } else {
            res.status(400).end("Bad request, check if data-type is entered in the header field");
        }
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
});

// Get all locations or a specific location based on the URL parameter
app.get('/location/:city', async function (req, res) {
    try {
        const locationCity = req.params.city;
        console.log(locationCity);
        if (locationCity == "AlleLocaties") {
            await haalAlleLocationsOp(req, res);
        } else {
            await haalSpecifiekeLocationOp(req, res, locationCity);
        }
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
});

// Post Position voegt een Position toe
app.post('/position', async function (req, res) {
    try {
        const body = req.rawBody;
        const acceptHeader = req.get('Accept');

        if (acceptHeader === 'application/xml') {
            const schemaPath = "xsd_schemes/position_data_scheme.xsd";
            const XMLschema = xsd.parseFile(schemaPath);
            const validationErrors = XMLschema.validate(body);

            if (validationErrors == null) {
                const result = await parseXML(body);
                const { PositionTitle, education, minSalary, maxSalary } = result.row;

                await addPosition(PositionTitle[0], education[0], minSalary[0], maxSalary[0]);
                res.status(200).send("Position added: " + PositionTitle[0]);
            } else {
                res.status(400).end("Incorrect XML");
            }
        } else if (acceptHeader === 'application/json') {
            const positionValidation = v.validate(req.body, PositionJSONschema);

            if (positionValidation.errors.length === 0) {
                const { PositionTitle, education, minSalary, maxSalary } = req.body;
                console.log(req.body)
                await addPosition(PositionTitle, education, minSalary, maxSalary);
                res.status(200).send("Position added: " + PositionTitle);
            } else {
                res.status(400).end("Incorrect JSON");
            }
        } else {
            res.status(400).end("Bad request, check if data-type is entered in the header field");
        }
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
});

// Get all positions or a specific position based on the URL parameter
app.get('/position/:title', async function (req, res) {
    try {
        const positionTitle = req.params.title;
        if (positionTitle == "AllePosities") {
            await haalAllePositiesOp(req, res);
        } else {
            await haalSpecifiekePositionOp(req, res, positionTitle);
        }
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
});

// Get location information
app.get('/locationinfo', async function (req, res) {
    try {
        const rows = await getLocationInfo();
        if (rows !== null) {
            res.status(200).send(rows);
        } else {
            res.status(404).send("No data found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).end("Internal Server Error");
    }
});