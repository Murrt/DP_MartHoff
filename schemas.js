
// User JSON schema
const UserJSONschema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "ssn": {
      "type": "string",
      "maxLength": 12,
      "minLength": 10,
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
      "type": "number",
      "minimum": 0,
      "maximum": 9999999,
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
      "description": "Work performance of the last year"
    },
  },
  "required": [
    "ssn",
    "lastname",
    "firstname",
    "hiredate",
    "salary",
    "gender",
    "performance",
  ]
};

// Location JSON schema
const LocationJSONschema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "LocationCity": {
      "type": "string",
      "maxLength": 255,
      "minLength": 0,
      "description": "Name of the city"
    },
    "address": {
      "type": "string",
      "maxLength": 255,
      "minLength": 0,
      "description": "Street name and number"
    },
    "state": {
      "type": "string",
      "maxLength": 4,
      "minLength": 2,
      "description": "State"
    },
    "zipcode": {
      "type": "string",
      "minLength": 0,
      "maxLength": 8,
      "description": "Zipcode"
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


// Position JSON schema
const PositionJSONschema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "PositionTitle": {
      "type": "string",
      "maxLength": 255,
      "minLength": 0,
      "description": "Name of the title"
    },
    "education": {
      "type": "string",
      "maxLength": 255,
      "minLength": 0,
      "description": "Name of the education"
    },
    "minSalary": {
      "type": "integer",
      "minimum": 0,
      "description": "Minimum salary"
    },
    "maxSalary": {
      "type": "integer",
      "minimum": 0,
      "description": "Maximum salary"
    }
  },
  "required": [
    "PositionTitle",
    "education",
    "minSalary",
    "maxSalary"
  ]
};


module.exports = {
  UserJSONschema,
  LocationJSONschema,
  PositionJSONschema
};