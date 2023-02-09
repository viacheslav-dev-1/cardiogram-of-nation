export class Store {
    static #interval = null
    static #subjects = []

    static init(timeout) {
        this.#interval === undefined || this.#interval === null &&
            (this.#interval = setInterval(() => {
                this.#subjects.length > 0 && this.#subjects.forEach(it => {
                    if (it && it.prev !== it.cur && it.funcs && it.funcs.length > 0) {
                        it.funcs.forEach(func => func && func(it.prev, it.cur))
                        it.prev = it.cur
                    }
                })
            }, timeout !== undefined && timeout !== null ? timeout : 0))
    }

    static mut(name, value) {
        const subject = this.#subjects.filter(s => s.name === name)[0]
        if (!subject) {
            this.#subjects.push(new Subject(name, value))
        } else {
            subject.cur = value
        }
    }

    static sub(name, func) {
        const subject = this.#subjects.filter(s => s.name === name)[0]
        if (!subject) {
            const sub = new Subject(name, null)
            sub.funcs.push(func)
            this.#subjects.push(sub)
        } else {
            subject.funcs.push(func)
        }
    }

    static get(name) {
        return this.#subjects.filter(s => s.name === name)[0]
    }

    static destroy() {
        this.#interval !== undefined && this.#interval !== null && clearInterval(this.#interval)
        this.#subjects = []
    }
}

class Subject {
    name = ''
    prev = null
    cur = null
    funcs = []

    constructor(name, cur) {
        this.name = name
        this.cur = cur
    }
}
