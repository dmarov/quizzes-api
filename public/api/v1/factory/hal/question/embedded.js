module.exports = async ({ origin, userName, quizId, questionId }) => {

    let _embedded = {
        content: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions/${questionId}/content`,
        },
        response: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions/${questionId}/response`,
        },
        tags: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions/${questionId}/tags`,
        },
    };

    return _embedded;

}
