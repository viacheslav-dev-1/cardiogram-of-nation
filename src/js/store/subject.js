export class Subject {
    name = ''
    prev = null
    cur = null
    funcs = []

    constructor(name, cur) {
        this.name = name
        this.cur = cur
    }
}
