'use strict';

const Router = require('koa-better-router');
const Koa = require('koa');

const path = require('path');
const fs = require('fs');

const DOC_PATH = path.resolve(__dirname, '../../../doc/api/v1/openapi.html');

const router = Router().loadMethods();

router.get('/', async ctx => {

    ctx.set("Content-Type", "text/html");
    ctx.body = fs.createReadStream(DOC_PATH);
});

let app = new Koa();
app.use(router.middleware());

// const Router = require('koa-better-router');
// const path = require('path');
// const fs = require('fs');
// const router = require('./router');

// const DOC_PATH = path.resolve(__dirname, '../../../doc/api/v1/openapi.html');

// const jwtParser = require('./middleware/jwt-parser.js');

// const users = require('./routes/users.js');

// const router = Router().loadMethods();

// router.addRoute('GET', '/users', [ jwtParser, users.get ]);
// router.addRoute('GET', '/users/:userName', [ jwtParser, users ]);
// router.addRoute('GET', '/users/:userName/quizzes', [ jwtParser, quizzes ]);
// router.addRoute('GET', '/users/:userName/quizzes/:quizId', [ jwtParser, quiz ]);
// const usersRoute = require('./routes/users.js');

// const router = Router();

// api documentation
// router.addRoute('GET', '/', async ctx => {

//     ctx.set("Content-Type", "text/html");
//     ctx.body = fs.createReadStream(DOC_PATH);

// });


// let pool = [];

// function jwtProtect(method, path) {

//     return (target, key, descriptor) => {

//         pool.push({ method, path, handlers: [jwtParser, target[key]] });

//     }
// }

// function justRoute(method, path) {

//     return (target, key, descriptor) => {

//         pool.push({ method, path, handlers: [target[key]] });

//     }
// }

// class RouterWrap {

//     @jwtProtect('get', '/users')
//     getUsers(ctx, next) {
//         console.log('users ok');
//     }

//     @jwtProtect('get', '/users/:userName')
//     getUser(ctx, next) {
//         console.log('user ok');
//     }

//     @justRoute('get', '/users/:userName/quizzes')
//     getUser(ctx, next) {
//         console.log('quizzes ok');
//     }

// }

// for (let route of pool)
//     router.addRoute(route.method, route.path, route.handlers);

module.exports = app;