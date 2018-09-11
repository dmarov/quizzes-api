class Di {

    constructor() {
        this._pool = {};
    }

    get(key) {
        return this._pool[key];
    }

    set(key, value) {
        this._pool[key] = value;
    }

}

module.exports = Di;
