module.exports = async ({origin, userName, quizId}) => {

    let url = `${origin}/users/${userName}/quizzes/${quizId}`;

    let _links = {
        self: {
            href: url,
        },
    };

    return _links;

}
