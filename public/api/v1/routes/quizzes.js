const Router = require('koa-better-router');
const { checkRole, checkUser } = require('../middleware');
const camelcaseKeys = require('camelcase-keys');
const snakecaseKeys = require('snakecase-keys');

const quizzesLinks = require('../factory/hal/links/quizzes');
const quizzesEmbedded = require('../factory/hal/embedded/quizzes');
const quizLinks = require('../factory/hal/links/quiz');
const quizEmbedded = require('../factory/hal/embedded/quiz');

const path = '/users/:user/quizzes';
const routes = Router().loadMethods();

routes.get(path, checkRole('admin'), checkUser('user'),
    async (ctx, next) => {

        let userName = ctx.params.user;
        let origin = ctx.origin;

        let offset = parseInt(ctx.query.offset);
        if (!offset) offset = 0;

        let limit = parseInt(ctx.query.limit);
        if (!limit) limit = 30;

        let user = await ctx.db.user
            .findOne({ name: userName });

        let quizzes = await ctx.db.quiz
            .find({ user_id: user.id }, { offset, limit });

        let size = quizzes.size;

        let _links = await quizzesLinks({ origin, userName, offset, limit, size });
        let _embedded = await quizzesEmbedded({ origin, userName, quizzes });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = {
            _embedded,
            _links,
            offset,
            limit,
            size,
        };

    }
);

routes.post(path, checkRole('admin'), checkUser('user'),
    async (ctx, next) => {

        let userName = ctx.params.user;
        let user = await ctx.db.user
            .findOne({ name: userName });

        let params = ctx.request.body;

        let sort = params.sort;

        if (!sort)
            sort = await ctx.db.quiz
                .findOne({ user_id: user.id })
                .then(quiz => quiz ? quiz.sort : 1);

        let quiz = await ctx.db.quiz
            .insert({ title: params.title, user_id: user.id, sort });

        let origin = ctx.origin;
        let quizSort = quiz.sort;

        let _links = await quizLinks({ origin, userName, quizSort });
        let _embedded = await quizEmbedded({ origin, userName, quizSort });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = {
            ...quiz,
            _links,
            _embedded,
        }
    }
);

module.exports = routes;
