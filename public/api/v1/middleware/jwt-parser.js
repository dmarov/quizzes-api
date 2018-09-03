'use strict';

const args = require('@lib/args.js');
const prequest = require('request-promise-native');

module.exports = _ => {

    return async (ctx, next) => {

        let request = ctx.request;
        let header = request.header;
        let auth = header.authorization;
        let jwt = null;
        auth && (jwt = auth.match(/^Bearer +(.*)$/)[1]);

        try {

            if (jwt) {

                let response = await prequest({
                    uri: args.jwtDecoderUrl,
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: {
                        token: jwt,
                    },
                    json: true,
                });

                ctx.state.jwt = response;
            }

        } catch(e) {

            if ([ 'StatusCodeError', ].includes(e.name))
                ctx.state.jwt = null;
            else throw(e);
        }

        await next();

    }
}
