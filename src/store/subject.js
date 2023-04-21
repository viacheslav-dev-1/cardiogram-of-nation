export class Subject {
    #name = ''
    #prev = null
    #cur = null
    #funcs = []

    constructor(name, cur) {
        this.#name = name
        this.#cur = cur
    }

    set funcs(f) {
        this.#funcs = f
    }

    get funcs() {
        return this.#funcs
    }

    get name() {
        return this.#name
    }

    set prev(p) {
        this.#prev = p
    }

    get prev() {
        return this.#prev
    }

    set cur(c) {
        this.#cur = c
    }

    get cur() {
        return this.#cur
    }
}
