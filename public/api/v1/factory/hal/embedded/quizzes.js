const quizLinks = require('../links/quiz');

module.exports = async ({ origin, userName, quizzes }) => {

    let promises = quizzes.map(async quiz => {
        return quizLinks({
            origin,
            userName,
            quizId: quiz.id
        }).then(_links => {
            return {
                ...quiz,
                _links
            }
        });
    });

    let _embedded = {
        items: await Promise.all(promises),
    };

    return _embedded;

}
