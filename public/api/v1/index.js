'use strict';

const Koa = require('koa');
const Router = require('koa-better-router');
const bodyParser = require('koa-bodyparser');

const jwtParser = require('./middleware/jwt-parser')
const Routes = require('./routes');

const path = require('path');
const fs = require('fs');
const DOC_PATH = path.resolve(__dirname, '../../../doc/api/v1/openapi.html');

const routes = Router().loadMethods();

routes.get('/', async ctx => {

    ctx.set("Content-Type", "text/html");
    ctx.body = fs.createReadStream(DOC_PATH);

});

routes.extend(Routes);

let app = new Koa();

app.use(bodyParser());
app.use(jwtParser());

app.use(routes.middleware());

module.exports = app;

// let routesTree = {
//     '/users': {
//         handler: aaa,
//         subitems: {
//             '/:userName': {
//                 handler: aaa,
//                 subitems: {
//                     '/quizzes': {
//                         handler: aaa,
//                         subitems: {
//                             '/:quizId': {
//                                 handler: aaa,
//                                 subitems: {
//                                     '/tags': {
//                                         handler: aaa,
//                                         subitems: {
//                                             '/:tagName': aaa,
//                                         }
//                                     },
//                                     '/questions': {
//                                         handler: aaa,
//                                         subitems: {
//                                             '/:questionId': {
//                                                 handler: aaa,
//                                                 subitems: {
//                                                     '/tags': {
//                                                         handler: aaa,
//                                                         subitems: {
//                                                             '/:tagName': aaa,
//                                                         },
//                                                     },
//                                                 },
//                                             },
//                                         },
//                                     },
//                                     '/instances': {
//                                         handler: aaa,
//                                         subitems: {
//                                             '/:instanceId': {
//                                                 handler: aaa,
//                                                 subitems: {
//                                                     '/questions': 'aaa',
//                                                     '/responses': 'aaa',
//                                                 },
//                                             },
//                                         },
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//         },
//     },
// };

// let user = new User('/users/:userName');
// let quizzes = new Quizzes('/users/:userName/quizzes');
// let quiz = new Quiz('/users/:userName/quizzes/:quizId');
// let quizTags = new Quiz('/users/:userName/quizzes/:quizId/tags');
// let quizTag = new Quiz('/users/:userName/quizzes/:quizId/tags/:tagName');
// let questions = new Questions('/users/:userName/quizzes/:quizId/questions');
// let question = new Question('/users/:userName/quizzes/:quizId/questions/:questionId');
// let questionTags = new QuestionTags('/users/:userName/quizzes/:quizId/questions/:questionId/tags');
// let questionTag = new QuestionTag('/users/:userName/quizzes/:quizId/questions/:questionId/tags/:tagName');
// let quizInstances = new QuestionInstances('/users/:userName/quizzes/:quizId/instances');
// let quizInstance = new QuestionInstance('/users/:userName/quizzes/:quizId/instances/:instanceId');
// let quizInstanceQuestions = new QuestionInstanceQuestions('/users/:userName/quizzes/:quizId/instances/:instanceId/questions');
// let quizInstanceResponses = new QuestionInstanceResponses('/users/:userName/quizzes/:quizId/instances/:instanceId/responses');

// routes.extend(users.getRoutes());
// routes.extend(user.getRoutes());
// routes.extend(quizzes.getRoutes());
// routes.extend(quiz.getRoutes());
