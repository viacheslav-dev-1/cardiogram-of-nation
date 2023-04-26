import Component from "../../../component";
import Store from "../../../../store/store2";
import template from "./content-part.html"
import UtilsService from "../../../../services/utils-service";
import On from "../../../../event-handler/on";
import Wait from "../../../../routine/wait";
import MenuService from "../../../../services/menu-service";
import { menuConfig } from "../../menu-config";

export default class MenuContentPart extends Component {
    #items = []
    
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

            On.change(toggle, () => {
                asTarasB = !asTarasB
                localStorage.setItem('asTaras', asTarasB ? 1 : 0)
                Wait.for(450).then(() => Store.mut('asTaras', asTarasB))
            })

            this.#items.push(toggle)
        }

        MenuService.instance.build(dialogRef, menuConfig)
    }

    unmount() {
        this.#items.forEach(item => On.unsub(item))
        MenuService.instance.destroy()
    }
}
