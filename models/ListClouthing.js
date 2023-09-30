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
    edit(clouth) {
        const index = this.clouthings.indexOf(clouth);
        this.clouthings.splice(index, 1, clouth);
    }

    getClouthings() {
        return this.clouthings;
    }
}

export default ClouthingList;