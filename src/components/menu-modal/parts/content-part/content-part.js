import Component from "../../../component";
import Store from "../../../../store/store2";
import template from "./content-part.html"
import info from "../info-part/info-part.html"
import zero from "../zero-part/zero-part.html"
import UtilsService from "../../../../services/utils-service";
import EventHandler from "../../../../event-handler/event-handler";

export default class MenuContentPart extends Component {
    #infoItem = undefined
    #zeroItem = undefined
    #toggle = undefined
    
    mount(modalData) {
        const { anchor, dialogRef } = modalData
        super.mount({
            anchor,
            template
        })

        if (UtilsService.isMobile) {
            this.find('#asTaras').remove()
        } else {
            let asTarasB = localStorage.getItem('asTaras') == 1 ? true : false
            const toggle = this.find('#asTarasToggle')
            asTarasB && toggle.setAttribute('checked', 'true')
            asTarasB || toggle.removeAttribute('checked')

            this.#toggle = toggle
            EventHandler.sub(this.#toggle, 'change', () => {
                asTarasB = !asTarasB
                localStorage.setItem('asTaras', asTarasB ? 1 : 0)
                setTimeout(() => Store.mut('asTaras', asTarasB), 450)
            })
        }

        const backBtn = dialogRef.find('#backBtn svg')
        const title = dialogRef.find('#menuTitle')
        const content = this.find('#menuContent')
        
        const infoItem = this.find('#infoItem')
        this.#infoItem = infoItem
        EventHandler.sub(this.#infoItem, 'click', () => {
            backBtn.style.display = 'block'
            title.innerText = 'Інформація'
            content.innerHTML = info
        })

        const zeroItem = this.find('#zeroItem')
        this.#zeroItem = zeroItem
        EventHandler.sub(this.#zeroItem, 'click', () => {
            backBtn.style.display = 'block'
            title.innerText = 'Стани Zero-Point'
            content.innerHTML = zero
        })
    }

    unmount() {
        this.#toggle && EventHandler.unsub(this.#toggle)
        this.#infoItem && EventHandler.unsub(this.#infoItem)
        this.#zeroItem && EventHandler.unsub(this.#zeroItem)
    }
}
