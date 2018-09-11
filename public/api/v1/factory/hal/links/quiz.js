module.exports = async ({origin, userName, quizSort}) => {

    let url = `${origin}/users/${userName}/quizzes/${quizSort}`;
    let responsesUrl = `${origin}/users/${userName}/quizzes/${quizSort}/responses`;

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
