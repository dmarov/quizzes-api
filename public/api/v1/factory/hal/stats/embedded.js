const halQuestion = require('../question');

module.exports = async ({ origin, userName, quizId, items }) => {

    let promises = items.map(async item => {
        return halQuestion.links({
            origin,
            userName,
            quizId,
            questionId: item.question.id,
        }).then(_links => {
            return {
                ...item,
                _links
            }
        });
    });

    let _embedded = {
        items: await Promise.all(promises),
    };

    return _embedded;

}
