const Validator = require('jsonschema');

let textSchema = {
    type: "object",
    properties: {
        type: {
            type: "string",
            pattern: "^text$",
        },
        text: {
            type: "string",
        }
    },
    required: ["type", "text"],
};

let imageSchema = {
    type: "object",
    properties: {
        type: {
            type: "string",
            pattern: "^image$",
        },
        src: {
            type: "string",
        }
    },
    required: ["type", "src"],
};

module.exports = async content => {

    switch(content.type) {
        case 'text': {
            let res = Validator.validate(content, textSchema);
            if (res.errors.length > 0)
                throw new Error('invalid content');
            break;
        }
        case 'image': {
            let res = Validator.validate(content, imageSchema);
            if (res.errors.length > 0)
                throw new Error('invalid content');
            break;
        }
        default:
            throw new Error('invalid content');

    }

    return content;
};
