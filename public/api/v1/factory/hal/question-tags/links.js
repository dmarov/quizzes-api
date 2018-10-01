module.exports = async ({ origin, userName, quizId, questionId, tags }) => {

    let _links = {
        self: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions/${questionId}/tags`,
        },
    };

    return _links;

}
