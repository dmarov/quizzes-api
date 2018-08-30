#!/usr/bin/env node


'use strict';
/* namespases for nodejs */

var _desc, _value, _class;

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

require('module-alias/register');

// const args = require('@lib/args');
// const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
// const Router = require('koa-better-router');
// const http = require('http');

// const apiV1Route = require('./api/v1');
// const apiV1Middleware = require('./api/v1/middleware/jwt-parser')

// let app = new Koa();

function hello(target, param, descriptor) {
    console.log(descriptor);
}

let Say = (_class = class Say {
    sayHello() {}
}, (_applyDecoratedDescriptor(_class.prototype, 'sayHello', [hello], Object.getOwnPropertyDescriptor(_class.prototype, 'sayHello'), _class.prototype)), _class);


let say = new Say();
say.sayHello();

// app.use(bodyParser());

// app.use(
//     Router({ prefix: '/api/v1' })
//         .extend(apiV1Route)
//         .middleware()
// );

// app.use(
//     apiV1Route
//         .middleware()
// );

// let server = http.createServer(app.callback());
// server.listen(args.port, args.host)