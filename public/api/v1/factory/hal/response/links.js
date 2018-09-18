module.exports = async ({ origin, userName, quizId, responseId }) => {

    let url = `${origin}/users/${userName}/quizzes/${quizId}/responses/${responseId}`;

    let _links = {
        self: {
            href: url,
        },
    };

    return _links;

}
