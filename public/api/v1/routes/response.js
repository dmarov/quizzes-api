const Router = require('koa-better-router');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');
const knex = require('knex')({ client: 'pg' });

const { checkRole, checkUser, user, quiz, response } = require('../middleware');
const hal = require('../factory/hal');
const path = '/users/:user/quizzes/:quizId/responses/:responseId';
const routes = Router().loadMethods();

routes.get(path, user(), quiz(), response(),
    async (ctx, next) => {

        let response = ctx.state.response;

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = ctx.params.quizId;
        let responseId = ctx.params.responseId;

        let _links = await hal.response.links({ origin, userName, quizId, responseId });
        let _embedded = await hal.response.embedded({ origin, userName, quizId, responseId });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { ...response, _embedded, _links };
    }
);

module.exports = routes;
