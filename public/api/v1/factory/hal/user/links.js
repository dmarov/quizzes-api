module.exports = async ({ origin, userName }) => {

    let url = `${origin}/users/${userName}`;

    let _links = {
        self: {
            href: url,
        },
        quizzes: {
            href: `${origin}/users/${userName}/quizzes`,
        },
    };

    return _links;

}
