'use strict';

const Router = require('koa-better-router');
const path = require('path');
const fs = require('fs');

const DOC_PATH = path.resolve(__dirname, '../../../doc/api/v1/openapi.html');

const jwtParser = require('./middleware/jwt-parser.js');
// const usersRoute = require('./routes/users.js');

const routes = Router().loadMethods();

// api documentation
routes.get('/', async ctx => {

    ctx.set("Content-Type", "text/html");
    ctx.body = fs.createReadStream(DOC_PATH);

});

// route.get('/users', jwtParser, getUsers);
// route.get('/users/:userName', jwtParser, getUser);
// users resource
// routes.extend(usersRoute);

module.exports = routes;

