export default class Component {
    #anchor = ''
    #element = undefined
    #copy = undefined

    mount({ anchor, template, display = null }) {
        let error = ''
        template === undefined || template === null && (error = 'Template path should not be empty')
        this.#isBlank(anchor) && (error = 'Anchor element Id should not be empty')

        if (error !== '') {
            console.error(error)
            return
        }

        this.#anchor = anchor

        try {
            const element = document.getElementById(anchor)
            if (element === null || element === undefined)
                throw new Error(`Element with anchor ${anchor} is not found`)
            element.innerHTML = template
            display === null || (element.style.display = display)
            this.#element = element
            this.#copy = element.cloneNode(true)
        }
        catch (e) {
            console.error(e)
        }
    }

    get element() {
        return this.#element
    }

    get copy() {
        return this.#copy
    }

    find(selector) {
        return this.element.querySelector(selector)
    }

    findAll(selector) {
        return this.element.querySelectorAll(selector)
    }

    unmount(hide = true) {
        if (this.#anchor === '') {
            console.error(`Anchor was not provided`)
            return
        }
        if (this.#element === undefined) {
            console.error(`Element with anchor ${this.#anchor} is not found`)
            return
        }

        this.#element.innerHTML = ''
        hide && (this.#element.style.display = 'none')
    }

    #isBlank(str) {
        return (!str || /^\s*$/.test(str))
    }
}
