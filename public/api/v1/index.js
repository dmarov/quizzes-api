'use strict';

const Koa = require('koa');
const Router = require('koa-better-router');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const fs = require('fs');
const massive = require('massive');
const di = require('./di');

const jwtParser = require('./middleware/jwt-parser')
const Routes = require('./routes');

module.exports = async _ => {

    let db = await massive({
        host: "127.0.0.1",
        port: 5432,
        user: "quizzes_api",
        password: "NRuWlO0uLsG75ySUSE3KDuF7or0M1WLwEkTcXk8q",
        database: "quizzes_api_v1",
    });

    di.append('db', db);

    const DOC_PATH = path.resolve(__dirname, '../../../doc/api/v1/openapi.html');

    const routes = Router().loadMethods();

    routes.get('/', async ctx => {

        ctx.set("Content-Type", "text/html");
        ctx.body = fs.createReadStream(DOC_PATH);

    });

    routes.extend(Routes);

    let app = new Koa();

    app.use(async (ctx, next) => {
        ctx.db = di.get('db');
        await next();
    });

    app.use(bodyParser());
    app.use(jwtParser());
    app.use(routes.middleware());

    return app;
}
