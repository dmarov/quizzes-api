'use strict';

const Koa = require('koa');
const Router = require('koa-better-router');
const bodyParser = require('koa-bodyparser');
const path = require('path');
const fs = require('fs');
const massive = require('massive');

const { jwtParser } = require('./middleware');
const Routes = require('./routes');

module.exports = async _ => {

    let db = await massive({
        host: process.env.PG_HOST,
        port: process.env.PG_PORT ? process.env.PG_PORT: 5432,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        database: "quizzes_api_v1",
    });

    const DOC_PATH = path.resolve(__dirname, '../../../doc/api/v1/openapi.html');
    const routes = Router().loadMethods();

    routes.get('/', async ctx => {
        ctx.set("Content-Type", "text/html");
        ctx.body = fs.createReadStream(DOC_PATH);
    });

    routes.extend(Routes);

    let app = new Koa();

    app.use(async (ctx, next) => {
        ctx.db = db;
        await next();
    });

    app.use(bodyParser({ strict: false }));
    app.use(jwtParser());
    app.use(routes.middleware());

    return app;
}
