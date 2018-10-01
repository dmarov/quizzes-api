const questionTag = require('../question-tag')

module.exports = async ({ origin, userName, quizId, questionId, tags }) => {

    let promises = tags.map(async tag => {
        return { value: tag, _links: await questionTag.links({ origin, userName, quizId, questionId, tag })};
    });

    tags = await Promise.all(promises);

    let _embedded = {
        items: tags,
    };

    return _embedded;

}
