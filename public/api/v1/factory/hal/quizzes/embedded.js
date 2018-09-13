const halQuiz = require('../quiz');

module.exports = async ({ origin, userName, quizzes }) => {

    let promises = quizzes.map(async quiz => {
        return halQuiz.links({
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
