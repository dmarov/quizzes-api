const Router = require('koa-better-router');
const { checkRole, checkUser, user, quiz, question } = require('../middleware');
const hal = require('../factory/hal');

const path = '/users/:user/quizzes/:quizId/questions/:questionId/tags';
const routes = Router().loadMethods();

const validator = require('../factory/validator');
const validateTags = validator.tags;

routes.get(path, checkRole('admin'), checkUser(), user(), quiz(), question(),
    async (ctx, next) => {

        let question = ctx.state.question;
        let tags = question.tags;

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let questionId = question.id;

        let _links = await hal.questionTags.links({ origin, userName, quizId, questionId, tags })
        let _embedded = await hal.questionTags.embedded({ origin, userName, quizId, questionId, tags })
        let count = tags.length;

        ctx.body = {
            count,
            _embedded,
            _links,
        };
    },
);

routes.post(path, checkRole('admin'), checkUser(), user(), quiz(), question(),
    async (ctx, next) => {

        let newTag = ctx.request.body;
        let question = ctx.state.question;
        let tags = question.tags;
        tags.push(newTag);

        try {
            tags = await validateTags(tags);
        } catch(e) {

            switch(e.name) {
                case 'unique error':
                    ctx.status = 409;
                    ctx.body = 'tag exists';
                    return;
                case 'type error':
                    ctx.status = 422;
                    ctx.body = 'invalid tag';
                    return;
                default:
                    throw e;
            }

        }

        tags = JSON.stringify(tags);
        question = await ctx.db.question.update({ id: question.id }, { tags });

        ctx.body = newTag;
    },
);

module.exports = routes;
