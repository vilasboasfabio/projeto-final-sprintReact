class ClouthingList {
    constructor() {
        this.clouthings = [];
    }

    add(clouth) {
        this.clouthings.push(clouth);
    }

    remove(clouth) {
        const index = this.clouthings.indexOf(clouth);
        this.clouthings.splice(index, 1);
    }

    getClouthings() {
        return this.clouthings;
    }
}

export default ClouthingList;