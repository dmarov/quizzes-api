const halQuestion = require('../question');

module.exports = async ({ origin, userName, quizId, questions }) => {

    let promises = questions.map(async question => {
        return { ...question, _links: await halQuestion.links({
            origin,
            userName,
            quizId,
            questionId: question.id,
        })};
    });

    let _embedded = {
        items: await Promise.all(promises),
    };

    return _embedded;

}
