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
        let _links = await hal.user.links({ origin, userName });
        let _embedded = await hal.user.embedded({ origin, userName });

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

        try {
            user = await ctx.db.user.update({ id: user.id }, fields)
                .then(res => camelCaseKeys(res));
        } catch(e) {
            ctx.status = 409;
            ctx.body = e.message;
            return;
        }

        ctx.status = 204;
    },
);

routes.delete(path, checkRole('api-admin'), user(),
    async (ctx, next) => {

        let user = ctx.state.user;
        user = await ctx.db.user.destroy({ id: user.id });

        ctx.status = 204;
    }
);

module.exports = routes;
