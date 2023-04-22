import Event from "./event.js"

export default class EventHandler {
    static #events = []

    static sub(node, event, func) {
        if (!node || !func || !event) {
            throw new Error('Node, event name or callback function should not be empty')
        }

        const eventObj = new Event(node, event, func)
        this.#events.push(eventObj)
        node.addEventListener(event, func)
    }

    static unsub(node) {
        try {
            let targetEvents = []
            if (this.#builtIn(node))
                targetEvents = this.#events.filter(e => this.#builtIn(e.node))
            else
                targetEvents = this.#events.filter(e => e.node.id === node.id)

            targetEvents.forEach(e => e.event && e.func && node.removeEventListener(e.event, e.func))

            if (this.#builtIn(node))
                this.#events = this.#events.filter(e => !this.#builtIn(e.node))
            else
                this.#events = this.#events.filter(e => e.node.id !== node.id)
        }
        catch (e) {
            console.error(e)
        }
    }

    static #builtIn(node) {
        return node instanceof Window || node instanceof Document
    }
}