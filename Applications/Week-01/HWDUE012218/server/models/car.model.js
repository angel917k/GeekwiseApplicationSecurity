class Blog {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    toString() {
        return `Entry: ${this.entry}, Signiture: ${this.signiture}`;
    }
}

module.exports = Blog;
