module.exports = async ({ origin, userName, quizId, tags }) => {

    let _links = {
        self: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/tags`,
        },
    };

    return _links;

}
