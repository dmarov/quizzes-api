module.exports = async ({ origin, userName, quizId }) => {

    let _embedded = {
        tags: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/tags`,
        },
        questions: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions`,
        },
        responses: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/responses`,
        }
    };

    return _embedded;

}
