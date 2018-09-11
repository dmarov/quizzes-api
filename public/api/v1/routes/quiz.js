const Router = require('koa-better-router');
const { checkRole, checkUser } = require('../middleware');

const path = '/users/:user/quizzes/:quizId';
const routes = Router().loadMethods();

routes.get(path, checkRole('admin'), checkUser('user'),
    async (ctx, next) => {

        let user = await ctx.db.user
            .findOne({
                name: ctx.params.user
            });

        let quiz = await ctx.db.quiz
            .findOne({
                user_id: user.id,
            });

        await next();
    }

);

routes.patch(path, async (ctx, next) => {

    await next();
});

routes.delete(path, async (ctx, next) => {

    await next();
});

module.exports = routes;
