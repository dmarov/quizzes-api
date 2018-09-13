const Router = require('koa-better-router');
const { checkRole, checkUser, user, quiz } = require('../middleware');
const hal = require('../factory/hal');

const path = '/users/:user/quizzes/:quizId';
const routes = Router().loadMethods();

routes.get(path, user(), quiz(),
    async (ctx, next) => {

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let quiz = ctx.state.quiz;
        let quizId = quiz.id;
        let _links = await hal.quiz.links({ origin, userName, quizId });
        let _embedded = await hal.quiz.embedded({ origin, userName, quizId });

        ctx.body = {
            ...quiz,
            _links,
            _embedded,
        };
    }
);

routes.patch(path, checkRole('admin'), checkUser(), user(), quiz(),
    async (ctx, next) => {

        let quizId = ctx.state.quiz.id;

        let fields = ctx.request.body;
        delete fields.creation_date;
        delete fields.sort;
        delete fields.user_id;
        delete fields.id;

        let quiz = await ctx.db.quiz.update({ id: quizId }, { ...fields });

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let _links = await hal.quiz.links({ origin, userName, quizId });
        let _embedded = await hal.quiz.embedded({ origin, userName, quizId });

        ctx.body = {
            ...quiz,
            _links,
            _embedded,
        };
    },
);

routes.delete(path, checkRole('admin'), checkUser(), user(), quiz(),
    async (ctx, next) => {

        let quizId = ctx.params.quizId;
        let quiz = await ctx.db.quiz.destroy({ id: quizId });

        ctx.status = 204;
        ctx.body = 'quiz deleted';
    },
);

module.exports = routes;
