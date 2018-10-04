const Router = require('koa-better-router');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');
const knex = require('knex')({ client: 'pg' });

const { checkRole, checkUser, user, quiz, question } = require('../middleware');
const hal = require('../factory/hal');
const path = '/users/:user/quizzes/:quizId/questions/:questionId';
const routes = Router().loadMethods();

const validator = require('../factory/validator');
const validateContent = validator.question.content;
const validateResponse = validator.question.response;
const validateTags = validator.tags;

routes.get(path, user(), quiz(), question(),
    async (ctx, next) => {

        let question = ctx.state.question;

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = ctx.params.quizId;
        let questionId = ctx.params.questionId;

        let _links = await hal.question.links({ origin, userName, quizId, questionId });
        let _embedded = await hal.question.embedded({ origin, userName, quizId, questionId });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { ...question, _embedded, _links };
    }
);

routes.patch(path, user(), quiz(), question(),
    async (ctx, next) => {

        let question = ctx.state.question;

        let fields = camelCaseKeys(ctx.request.body);
        if (fields.id || fields.quiz_id || fields.creation_date) {
            ctx.status = 403;
            ctx.body = 'forbidden';
            return;
        }

        try {
            fields.content = await validateContent(fields.content);
            fields.response = await validateResponse(fields.response);
            fields.tags = await validateTags(fields.tags);
            fields.tags = JSON.stringify(fields.tags);
        } catch(e) {
            ctx.status = 422;
            ctx.body = e.message;
        }

        question = await ctx.db.question.update({ id: question.id }, fields);

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = ctx.params.quizId;
        let questionId = ctx.params.questionId;

        let _links = await hal.question.links({ origin, userName, quizId, questionId });
        let _embedded = await hal.question.embedded({ origin, userName, quizId, questionId });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { ...question, _embedded, _links };
    }
);

routes.delete(path, user(), quiz(), question(),
    async (ctx, next) => {

        let question = ctx.state.question;

        ctx.db.question.destroy({ id: question.id });
        ctx.status = 204;
    }
);

module.exports = routes;
