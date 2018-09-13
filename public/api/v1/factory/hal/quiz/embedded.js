module.exports = async ({ origin, userName, quizId }) => {

    let _embedded = {
        self: {
            href: `${origin}/users/${userName}/quizzes/${quizId}`,
        },
        tags: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/tags`,
        },
        questions: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions`,
        },
    };

    return _embedded;

}
