const Router = require('koa-better-router');
const snakeCaseKeys = require('snakecase-keys');
const camelCaseKeys = require('camelcase-keys');

const { checkRole, user } = require('../middleware');
const hal = require('../factory/hal');
const validator = require('../factory/validator');
const validateName = validator.userName;

const path = '/users/:user';
const routes = Router().loadMethods();

routes.get(path, user(),
    async (ctx, next) => {

        let origin = ctx.origin;
        let user = ctx.state.user;
        let userName = ctx.params.user;
        let _links = await hal.quiz.links({ origin, userName });
        let _embedded = await hal.quiz.embedded({ origin, userName });

        ctx.body = { ...user, _links, _embedded };
    }
);

routes.patch(path, checkRole('api-admin'), user(),
    async (ctx, next) => {

        let user = ctx.state.user;
        let fields = ctx.request.body;
        fields = snakeCaseKeys(fields);
        delete fields.id;

        try {
            fields.name = await validateName(fields.name);
        } catch(e) {
            ctx.status = 422;
            ctx.body = e.message;
            return;
        }

        user = await ctx.db.user.update({ id: user.id }, fields)
            .then(res => camelCaseKeys(res));

        let origin = ctx.origin;
        let userName = ctx.params.user;
        let _links = await hal.user.links({ origin, userName });
        let _embedded = await hal.user.embedded({ origin, userName });

        ctx.body = { ...user, _links, _embedded };
    },
);

routes.delete(path, checkRole('api-admin'),
    async (ctx, next) => {

        let user = ctx.state.user;
        user = await ctx.db.user.destroy({ id: user.id });

        ctx.status = 204;
        ctx.body = 'quiz deleted';
    }
);

module.exports = routes;
