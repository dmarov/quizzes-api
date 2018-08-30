'use strict';

const Router = require('koa-better-router');
const Request = require('request-promise-native');

const route = Router().loadMethods();
 

// @route('get', '/users')
// function getUsers() {

// }

route.get('/users', jwtParser, getUsers);
route.get('/users/:userName', jwtParser, getUser);


module.exports = route;
