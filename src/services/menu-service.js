import On from "../event-handler/on"
import Factory from "../components/component-factory"

export default class MenuService {
    #subs = []
    #componentInstance = undefined
    static #instance = undefined

    static get instance() {
        if (!this.#instance) {
            this.#instance = new MenuService()
        }
        return this.#instance
    }

    build(dialogRef, items) {
        const backBtn = dialogRef.find('#backBtn svg')
        const title = dialogRef.find('#menuTitle')
        const content = dialogRef.find('#menuContent')

        items.forEach((item, i) => {
            const id = 'menuItem' + i
            const div = document.createElement('div')
            div.className = 'menu-item'
            div.id = id
            item.classList && (div.className += ' ' + item.classList)

            if (item.subtitle) {
                div.classList.add('subtitle')
                div.innerHTML = item.title
                content.appendChild(div)
                return
            } else {
                const divIcon = document.createElement('div')
                divIcon.className = 'icon'
                divIcon.innerHTML = item.icon

                const divText = document.createElement('div')
                divText.className = 'text'
                divText.innerHTML = item.title

                div.appendChild(divIcon)
                div.appendChild(divText)
                content.appendChild(div)
            }

            const itemEl = dialogRef.find('#' + id)
            On.click(itemEl, () => {
                backBtn.style.display = 'block'
                title.innerText = item.title

                if (item.component) {
                    let componentData = { anchor: 'menuContent' }
                    item.extras && (componentData = { ...componentData, ...item.extras })
                    this.#componentInstance = Factory.mount(item.component, componentData)
                }
            })
            this.#subs.push(itemEl)
        })
    }

    destroy() {
        this.#subs.forEach(item => On.unsub(item))
        this.#componentInstance && this.#componentInstance.unmount()
    }
}
