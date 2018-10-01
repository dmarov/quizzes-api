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
        delete fields.id;
        delete fields.quiz_id;
        delete fields.sort;
        delete fields.creation_date;
        delete fields.tags;

        try {
            fields.content = await validateContent(fields.content);
            fields.response = await validateResponse(fields.response);
        } catch(e) {
            ctx.status = 422;
            ctx.body = e.message;
        }

        // let tags = fields.tags;

        // try {
        //     tags = await validateTags(tags);
        // } catch(e) {

        //     switch(e.name) {
        //         case 'unique error':
        //             ctx.status = 409;
        //             ctx.body = 'tag exists';
        //             return;
        //         case 'type error':
        //             ctx.status = 422;
        //             ctx.body = 'invalid tag';
        //             return;
        //         default:
        //             throw e;
        //     }

        // }

        // fields.tags = JSON.stringify(tags);

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
