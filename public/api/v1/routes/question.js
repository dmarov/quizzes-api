const Router = require('koa-better-router');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');
const knex = require('knex')({ client: 'pg' });
const { validate } = require('jsonschema');

const { checkRole, checkUser, user, quiz, question } = require('../middleware');
const hal = require('../factory/hal');
const path = '/users/:user/quizzes/:quizId/questions/:questionId';
const routes = Router().loadMethods();

let tagsSchema = require('../schemas/tags');

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

        let tags = fields.tags;

        if (tags) {

            let res = validate(tags, tagsSchema);
            if (res.errors.length) {
                ctx.status = 422;
                ctx.body = 'invalid tags';
                return;
            } else {
                tags = JSON.stringify(tags);
                fields.tags = tags;
            }
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
