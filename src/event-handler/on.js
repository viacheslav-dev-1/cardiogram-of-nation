import EventHandler from "./event-handler";

export default class On {
    static click(node, func) { this.#handle(node, 'click', func) }
    static resize(func) { this.#handle(window, 'resize', func) }
    static input(node, func) { this.#handle(node, 'input', func) }
    static keypress(node, func) { this.#handle(node, 'keypress', func) }
    static change(node, func) { this.#handle(node, 'change', func) }
    static few(node, event) {
        Object.entries(event).forEach(entry => EventHandler.sub(node, entry[0], entry[1]))
    }
    static event(node, event, func) { this.#handle(node, event, func) }
    
    static unsub(node) { EventHandler.unsub(node) }

    static #handle(node, event, func) {
        EventHandler.sub(node, event, func)
    }
}
