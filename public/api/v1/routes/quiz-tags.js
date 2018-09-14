const Router = require('koa-better-router');
const { checkRole, checkUser, user, quiz } = require('../middleware');
const { validate } = require('jsonschema');
const hal = require('../factory/hal');

let tagsSchema = require('../schemas/tags');
const path = '/users/:user/quizzes/:quizId/tags';
const routes = Router().loadMethods();

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

        let newTag = ctx.request.body;
        let quiz = ctx.state.quiz;
        let tags = quiz.tags;
        tags.push(newTag);

        let res = validate(tags, tagsSchema);

        if (res.errors.length) {

            if (tags.includes(newTag)) {
                ctx.status = 409;
                ctx.body = 'tag exists';
            } else {
                ctx.status = 422;
                ctx.body = 'invalid tag';
            }

            return;
        }

        tags = JSON.stringify(tags);
        quiz = await ctx.db.quiz.update({ id: quiz.id }, { tags });

        let origin = ctx.origin;
        let userName = ctx.params.user;

        ctx.body = newTag;
    },
);

module.exports = routes;
