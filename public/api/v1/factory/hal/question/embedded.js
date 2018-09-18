module.exports = async ({ origin, userName, quizId, questionId }) => {

    let _embedded = {
        tags: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions/${questionId}/tags`,
        },
    };

    return _embedded;

}
