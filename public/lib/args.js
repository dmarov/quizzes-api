'use strict';

const yargs = require('yargs');

const args = yargs
    .option('port', {
        demandOption: true,
        alias: 'p',
    })
    .option('host', {
        demandOption: true,
        default: '0.0.0.0',
        alias: 'h',
    })
    .strict(true)
    .wrap(null)
    .version(`1.0.0`)
    .example(`$0 -p=9876`)
    .parse();

module.exports = args;
