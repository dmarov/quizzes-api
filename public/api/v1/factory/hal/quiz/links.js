module.exports = async ({origin, userName, quizId}) => {

    let url = `${origin}/users/${userName}/quizzes/${quizId}`;
    let responsesUrl = `${origin}/users/${userName}/quizzes/${quizId}/responses`;

    let _links = {
        self: {
            href: url,
        },
        responses: {
            href: responsesUrl,
        }
    };

    return _links;

}
