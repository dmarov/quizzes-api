const halQuiz = require('../quiz');
const quizTag = require('../quiz-tag')

module.exports = async ({ origin, userName, quizId, tags }) => {

    let promises = tags.map(async tag => {
        return { tag, _links: await quizTag.links({ origin, userName, quizId, tag })};
    });

    tags = await Promise.all(promises);

    let _embedded = {
        items: tags,
    };

    return _embedded;

}
