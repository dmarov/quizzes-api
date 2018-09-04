'use strict';

const Koa = require('koa');
const Router = require('koa-better-router');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const fs = require('fs');

const jwtParser = require('./middleware/jwt-parser')
const Routes = require('./routes');

const DOC_PATH = path.resolve(__dirname, '../../../doc/api/v1/openapi.html');

const routes = Router().loadMethods();

routes.get('/', async ctx => {

    ctx.set("Content-Type", "text/html");
    ctx.body = fs.createReadStream(DOC_PATH);

});

routes.extend(Routes);

let app = new Koa();

app.use(bodyParser());
app.use(jwtParser());
app.use(routes.middleware());

module.exports = app;
