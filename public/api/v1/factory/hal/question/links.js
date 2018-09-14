module.exports = async ({ origin, userName, quizId, questionId }) => {

    let url = `${origin}/users/${userName}/quizzes/${quizId}/questions/${questionId}`;

    let _links = {
        self: {
            href: url,
        },
    };

    return _links;

}
