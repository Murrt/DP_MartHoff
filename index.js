// initialiseer server/validator

const Validator = require('jsonschema').Validator;
const v = new Validator();

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(
    PORT,
    () => console.log('Server is live! localhost:/' + PORT)
);

var fs = require('fs'); 


// Schema waarmee we gaan valideren of de ingevoerde JSON correct is.

var schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "ssn": {
        "type": "string",
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
    if (req.query.ssn == null) {
        fs.readFile(__dirname + "/" + "personeels_data.json", 'utf8', function (err, data) {
            console.log(data);
            res.end(data);
        });
    } else {
            // als je in de query een ssn nummer mee geeft wordt 1 specifieke User opgehaald
            fs.readFile(__dirname + "/" + "personeels_data.json", 'utf8', function (err, data) {
            var users = JSON.parse(data);
            // hier loopen we door alle users heen opzoek naar de juiste ssn
            for (var i = 0; i < users.length; i++) {
                if (users !== null) {
                    if (users[i].ssn == req.query.ssn) {
                        console.log(users[i]);
                        res.end(JSON.stringify(users[i]));
                    }
                }
            }
            // is de loop klaar en is de res.end nog niet gevuurt, informeer user niet gevonden
            if (i == users.length) {
                res.end("not found");
            }
        });
    }

});

// addUser voegt een User toe aan de JSON
app.put('/addUser', function (req, res) {

    const {
        body
    } = req;

    // valideer de body tegen het JSON schema
    if(v.validate(body, schema)){
        console.log('correcte json');
        // lees de huidige file in
        fs.readFile(__dirname + "/" + "personeels_data.json", 'utf8', function (err, data) {
            data = JSON.parse(data);
            // voeg de nieuwe user toe
            data.push(body);

            newData = JSON.stringify(data);
            
            // schrijf de nieuwe data terug.
            fs.writeFile(__dirname + "/" + 'personeels_data.json', newData, err => {
                // error checking
                if (err) throw err;

                console.log("New user added");
            });

            console.log(newData);
            res.end("User: " + JSON.stringify(body) + " added");
        });
    }else{
        console.log('fout');
        res.end('JSON incorrect');
    }
})

app.delete('/deleteUser', function (req, res) {
    // First retrieve existing users
    fs.readFile(__dirname + "/" + "personeels_data.json", 'utf8', function (err, data) {

        var users = JSON.parse(data);
        // kijk of ssn gevult is
        if (req.query.ssn == null) {
            res.end("Enter SSN");
        } else {
            for (var i = 0; i < users.length; i++) {
                // de delete functie van JS laat een empty item achter, dus zonder users !== null krijg je na een delete een error bij het loopen 
                if (users !== null) {
                    if (users[i].ssn == req.query.ssn) {
                        // user gevonden
                        console.log(users[i]);
                        // delete de user uit de 
                        delete users[i];
                        console.log(users);
                        newData = JSON.stringify(users);
                        fs.writeFile(__dirname + "/" + 'personeels_data.json', newData, err => {
                            // error checking
                            if (err) throw err;

                            console.log("User data deleted");
                        });

                        res.end("User: " + JSON.stringify(users[i]) + " deleted");

                    }
                }
            }

        }

    });

});