const Router = require('koa-better-router');
const { checkRole, checkUser, user, quiz } = require('../middleware');
const hal = require('../factory/hal');

const path = '/users/:user/quizzes/:quizId/tags';
const routes = Router().loadMethods();

const validator = require('../factory/validator');
const validateTags = validator.tags;

routes.get(path, checkRole('admin'), checkUser(), user(), quiz(),
    async (ctx, next) => {

        let quiz = ctx.state.quiz;
        let tags = quiz.tags;

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quizId = quiz.id;

        let _links = await hal.quizTags.links({ origin, userName, quizId, tags })
        let _embedded = await hal.quizTags.embedded({ origin, userName, quizId, tags })
        let count = tags.length;

        ctx.body = {
            count,
            _embedded,
            _links,
        };
    },
);

routes.post(path, checkRole('admin'), checkUser(), user(), quiz(),
    async (ctx, next) => {

        let newTag = ctx.request.body.tag;
        let quiz = ctx.state.quiz;
        let tags = quiz.tags;
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
        quiz = await ctx.db.quiz.update({ id: quiz.id }, { tags });

        ctx.body = newTag;
    },
);

module.exports = routes;
