'use strict';

const yargs = require('yargs');

const args = yargs
    .option('port', {
        demandOption: true,
        alias: 'p',
        describe: 'port to listen on',
    })
    .option('host', {
        demandOption: true,
        default: '0.0.0.0',
        alias: 'h',
        describe: 'listen on ip address',
    })
    .option('jwt-decoder-url', {
        demandOption: true,
        alias: 'd',
        describe: 'endpoint to jwt decoder service acceptind format: {"token":"header.payload.signature"}',
    })
    .strict(true)
    .wrap(null)
    .version(`1.0.0`)
    .example(`$0 -p=9876 -d=http://jwt-sign-server.websm.io/api/v1/decoder`)
    .parse();

module.exports = args;
