export default class Event {
    #node = undefined
    #func = undefined
    #event = undefined

    constructor(node, event, func) {
        this.#node = node
        this.#event = event
        this.#func = func
    }

    get node() {
        return this.#node
    }

    get func() {
        return this.#func
    }

    get event() {
        return this.#event
    }
}