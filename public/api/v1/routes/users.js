const Router = require('koa-better-router');
const camelCaseKeys = require('camelcase-keys');
const snakeCaseKeys = require('snakecase-keys');
const knex = require('knex')({ client: 'pg' });

const { checkRole } = require('../middleware');
const hal = require('../factory/hal');
const validator = require('../factory/validator');
const validateName = validator.userName;

const path = '/users';
const routes = Router().loadMethods();

routes.get(path,
    async (ctx, next) => {

        let offset = parseInt(ctx.query.offset);
        if (!offset) offset = 0;

        let limit = parseInt(ctx.query.limit);
        if (!limit) limit = 30;

        let qb = knex('user')
        let qbCnt = qb.clone()
            .count()
            .toSQL()
            .toNative();

        let total = await ctx.db.query(qbCnt.sql, qbCnt.bindings)
            .then(res => res[0].count);

        qb = qb.offset(offset)
            .limit(limit)
            .toSQL()
            .toNative();

        let users = await ctx.db.query(qb.sql, qb.bindings)
            .then(res => res.map(item => camelCaseKeys(item)));

        let origin = ctx.origin;
        let size = users.length;

        let _links = await hal.users.links({ origin, offset, limit, size });
        let _embedded = await hal.users.embedded({ origin, users });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = { _embedded, _links, offset, limit, total, size };
    }
);

routes.post(path, checkRole('api-admin'),
    async (ctx, next) => {

        let quiz = ctx.state.quiz;

        let fields = snakeCaseKeys(ctx.request.body);
        delete fields.id;

        try {
            fields.name = await validateName(fields.name);
        } catch(e) {
            ctx.status = 422;
            ctx.body = e.message;
            return;
        }

        let user;

        try {
            user = await ctx.db.user.insert(fields)
                .then(res => camelCaseKeys(res));
        } catch(e) {
            ctx.status = 409;
            ctx.body = e.message;
            return;
        }

        let origin = ctx.origin;
        let userName = user.name;

        let _links = await hal.user.links({ origin, userName });
        let _embedded = await hal.user.embedded({ origin, userName });

        ctx.set('Content-Type', 'application/hal+json');
        ctx.body = {
            ...user,
            _links,
            _embedded,
        };
    }
);

module.exports = routes;
