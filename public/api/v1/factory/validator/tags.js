const Validator = require('jsonschema');

let schema = {
    "type": "array",
    "items": {
        "type": "string"
    },
    "uniqueItems": true
};

module.exports = async tags => {

    let res = Validator.validate(tags, schema);

    if (res.errors.length > 0) {

        let error = res.errors[0];

        switch (error.name) {
            case 'uniqueItems':
                throw {
                    name: 'unique error'
                };
                break;
            case 'type':
                throw {
                    name: 'type error'
                };
                break;
            default:
                throw {
                    name: 'unknown error',
                    message: 'unknown error happened at tags validation'
                };
        }
    }

    return tags;

}
