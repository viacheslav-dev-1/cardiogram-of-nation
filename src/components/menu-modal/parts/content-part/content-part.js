import Component from "../../../component";
import Store from "../../../../store/store2";
import template from "./content-part.html"
import info from "../info-part/info-part.html"
import zero from "../zero-part/zero-part.html"
import UtilsService from "../../../../services/utils-service";
import On from "../../../../event-handler/on";
import Wait from "../../../../routine/wait";

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
            On.change(this.#toggle, () => {
                asTarasB = !asTarasB
                localStorage.setItem('asTaras', asTarasB ? 1 : 0)
                Wait.for(450).then(() => Store.mut('asTaras', asTarasB))
            })
        }

        const backBtn = dialogRef.find('#backBtn svg')
        const title = dialogRef.find('#menuTitle')
        const content = this.find('#menuContent')
        
        const infoItem = this.find('#infoItem')
        this.#infoItem = infoItem

        On.click(this.#infoItem, () => {
            backBtn.style.display = 'block'
            title.innerText = 'Інформація'
            content.innerHTML = info
        })

        const zeroItem = this.find('#zeroItem')
        this.#zeroItem = zeroItem

        On.click(this.#zeroItem, () => {
            backBtn.style.display = 'block'
            title.innerText = 'Стани Zero-Point'
            content.innerHTML = zero
        })
    }

    unmount() {
        this.#toggle && On.unsub(this.#toggle)
        this.#infoItem && On.unsub(this.#infoItem)
        this.#zeroItem && On.unsub(this.#zeroItem)
    }
}
