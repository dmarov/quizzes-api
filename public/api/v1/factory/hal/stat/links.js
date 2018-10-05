module.exports = async ({ origin, userName, quizId, questionId }) => {

    let url = `${origin}/users/${userName}/quizzes/${quizId}/stats/${questionId}`;

    let _links = {
        self: {
            href: url,
        },
    };

    return _links;

}
