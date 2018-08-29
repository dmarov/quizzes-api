'use strict';

const Router = require('koa-better-router');
const path = require('path');
const fs = require('fs');

let route = Router().loadMethods();

const DOCDIR = path.resolve(__dirname, '../../../doc/api/v1/openapi.html');

route.get('/', async ctx => {

    try {

        ctx.set("Content-Type", "text/html");
        let docPath = path.resolve(DOCDIR);
        ctx.response.body = fs.createReadStream(docPath);

    } catch (e) {

        console.log(e);
        ctx.response.status = 500;

    }

});

module.exports = route;
