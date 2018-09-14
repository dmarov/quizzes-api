const Router = require('koa-better-router');
const { checkRole, checkUser, user, quiz } = require('../middleware');

const path = '/users/:user/quizzes/:quizId/tags/:tag';
const routes = Router().loadMethods();

routes.delete(path, checkRole('admin'), checkUser(), user(), quiz(),
    async (ctx, next) => {

        let quiz = ctx.state.quiz;
        let tag = ctx.params.tag;
        console.log(tag);
        let tags = quiz.tags;

        let index = tags.indexOf(tag);

        if (index !== -1) {
            tags.splice(index, 1);
            ctx.status = 204;
        } else {
            ctx.status = 404;
        }

        tags = JSON.stringify(tags);
        quiz = await ctx.db.quiz.update({ id: quiz.id }, { tags });

    },
);

module.exports = routes;
