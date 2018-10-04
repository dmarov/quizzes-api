module.exports = async ({origin, userName, quizId}) => {

    let url = `${origin}/users/${userName}/quizzes/${quizId}`;

    let _links = {
        self: {
            href: url,
        },
        questions: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/questions`,
        },
        responses: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/responses`,
        },
        stats: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/stats`,
        },
        tags: {
            href: `${origin}/users/${userName}/quizzes/${quizId}/tags`,
        },
    };

    return _links;

}
