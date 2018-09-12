const quizLinks = require('../links/quiz');

module.exports = async ({ origin, userName, quizzes }) => {

    let promises = quizzes.map(async quiz => {
            return quizLinks({ origin, userName, sort: quiz.sort });
        });

    let _embedded = {
        results: await Promise.all(promises),
    };

    return _embedded;

}
