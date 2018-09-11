const quizLinks = require('../links/quiz');

module.exports = async ({ origin, userName, quizzes }) => {

    let _embedded = {
        results: quizzes.map(async quiz => { return { ...quiz }; }),
    };
// , {await quizLinks({ origin, userName, sort: quiz.sort }
    return _embedded;

}
