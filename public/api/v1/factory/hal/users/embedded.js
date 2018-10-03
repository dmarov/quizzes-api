const halUser = require('../user');

module.exports = async ({ origin, users }) => {

    let promises = users.map(async user => {
        return halUser.links({
            origin,
            userName: user.name,
        }).then(_links => {
            return {
                ...user,
                _links
            }
        });
    });

    let _embedded = {
        items: await Promise.all(promises),
    };

    return _embedded;

}
