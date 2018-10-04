const Validator = require('jsonschema');

let singleOptionSchema = {
    type: "object",
    properties: {
        type: {
            type: "string",
            pattern: "^single option$",
        },
        options: {
            type: "array",
            items: {
                type: "any"
            },
            uniqueItems: true,
        },
    },
    required: ["type", "options"],
};

let multipleOptionsSchema = {
    type: "object",
    properties: {
        type: {
            type: "string",
            pattern: "^multiple options$",
        },
        options: {
            type: "array",
            items: {
                type: "any"
            },
            uniqueItems: true,
        },
    },
    required: ["type", "options"],
};

let sequenceSchema = {
    type: "object",
    properties: {
        type: {
            type: "string",
            pattern: "^sequence$",
        },
        items: {
            type: "array",
            items: {
                type: "any"
            },
            uniqueItems: true,
        },
    },
    required: ["type", "items"],
};

module.exports = async response => {

    switch(response.type) {
        case 'single option': {
            let res = Validator.validate(response, singleOptionSchema);
            if (res.errors.length > 0)
                throw new Error('invalid response');
            break;
        }
        case 'multiple options': {
            let res = Validator.validate(response, multipleOptionsSchema);

            if (res.errors.length > 0)
                throw new Error('invalid response');
            break;
        }
        case 'sequence': {
            let res = Validator.validate(response, sequenceSchema);
            if (res.errors.length > 0)
                throw new Error('invalid response');

            break;
        }
        default:
            throw new Error('invalid response');

    }

    return response;
};
