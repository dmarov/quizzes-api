'use strict';

const Router = require('koa-better-router');
const Request = require('request-promise-native');

const route = Router().loadMethods();
 
// @route('get', '/users')
// function getUsers() {

// }




class RouterWrap {

    @jwtProtect('get', '/users')
    static getUsers() {
    
    }

    static getUser() {
    
    }

}

route.get('/users', RouterWrap.getUsers);
// route.get('/users/:userName', RouterWrap.getUser);


module.exports = route;
