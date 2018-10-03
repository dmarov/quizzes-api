const Validator = require('jsonschema');

let schema = {
    "type": "string",
    "maxLength": 100,
    "minLength": 1,
};

module.exports = async name => {

    let res = Validator.validate(name, schema);

    if (res.errors.length > 0)
        throw new Error('invalid name');

    return name;

}
