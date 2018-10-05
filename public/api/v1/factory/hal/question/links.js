module.exports = async ({ origin, userName, quizId, questionId }) => {

    let url = `${origin}/users/${userName}/quizzes/${quizId}/questions/${questionId}`;

    let _links = {
        self: {
            href: url,
        },
        tags: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions/${questionId}/tags`,
        },
    };

    return _links;

}
