'use strict';

const Router = require('koa-better-router');
const path = require('path');
const fs = require('fs');

const jwtParser = require('./middleware/jwt-parser.js');

const usersRoute = require('./routes/users.js');

const DOC_PATH = path.resolve(__dirname, '../../../doc/api/v1/openapi.html');
const docRoute = Router().loadMethods();

docRoute.get('/', async ctx => {

    ctx.set("Content-Type", "text/html");
    ctx.response.body = fs.createReadStream(DOC_PATH);

});

const routes = Router();

// api documentation
routes.extend(docRoute);
// parses jwt if present
routes.extend(jwtParser);
// /users
routes.extend(usersRoute);

module.exports = routes;

