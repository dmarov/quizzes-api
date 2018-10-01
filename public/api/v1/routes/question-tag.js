const Router = require('koa-better-router');
const { checkRole, checkUser, user, quiz, question } = require('../middleware');

const path = '/users/:user/quizzes/:quizId/questions/:questionId/tags/:tag';
const routes = Router().loadMethods();

routes.delete(path, checkRole('admin'), checkUser(), user(), quiz(), question(),
    async (ctx, next) => {

        let question = ctx.state.question;
        let tag = ctx.params.tag;
        let tags = question.tags;

        let index = tags.indexOf(tag);

        if (index !== -1) {
            tags.splice(index, 1);
            ctx.status = 204;
        } else {
            ctx.status = 404;
        }

        tags = JSON.stringify(tags);
        question = await ctx.db.question.update({ id: quiz.id }, { tags });

    },
);

module.exports = routes;
