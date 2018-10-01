module.exports = async ({ origin, userName, quizId, questionId, tag }) => {

    let _links = {
        self: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions/${questionId}/tags/${tag}`,
        },
    };

    return _links;

}
