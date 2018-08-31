'use strict';

var _dec, _desc, _value, _class;

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

const Router = require('koa-better-router');
const Request = require('request-promise-native');

const route = Router().loadMethods();

// @route('get', '/users')
// function getUsers() {

// }


let RouterWrap = (_dec = jwtProtect('get', '/users'), (_class = class RouterWrap {
    static getUsers() {}

    static getUser() {}

}, (_applyDecoratedDescriptor(_class, 'getUsers', [_dec], Object.getOwnPropertyDescriptor(_class, 'getUsers'), _class)), _class));


route.get('/users', RouterWrap.getUsers);
// route.get('/users/:userName', RouterWrap.getUser);


module.exports = route;