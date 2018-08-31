'use strict';

const Router = require('koa-better-router');

const routes = {};

function route(method, path, group = 'default') {


    return (target, key, descriptor) => {
        let groupKey = `${group}`;
        if (!routes[groupKey]) routes[groupKey] = []; 
        routes[groupKey].push({ method, path, handler: target[key] });
    }
}


// class Routes {

//     @route('get', '/')
//     async testRoute(ctx, next) {
//         console.log('root ok');
//     }

//     @route('get', '/users')
//     async testRoute(ctx, next) {
//         console.log('users ok');
//     }

// }


// @route('get', '/ref')
// function testRoute() {}

// @route('get', '/ref/ref')
// function testRoute() {}

// @route('get', '/ref/ref/ref')
// function testRoute() {}

// @route('get', '/ref')
// function testRoute() {}

const router = Router();

router.addRoute('GET', '/', [ async _ => {}, async _ => {}, async _ => {} ]);

Object.keys(routes).forEach(key => {

    let routeItems = routes[key];

    for (let routeItem of routeItems) {
        console.log(routeItem);
        router.addRoute(routeItem.method, routeItem.path, routeItem.handler);
    }
})

module.exports = router;

