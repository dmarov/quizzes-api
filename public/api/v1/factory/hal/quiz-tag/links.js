module.exports = async ({ origin, userName, quizId, tag }) => {

    let _links = {
        self: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/tags/${tag}`,
        },
    };

    return _links;

}
