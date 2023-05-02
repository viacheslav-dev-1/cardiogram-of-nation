import Component from "../../../component";
import { mut } from 'tieder'
import template from "./content-part.html"
import UtilsService from "../../../../services/utils-service";
import On from "../../../../event-handler/on";
import Wait from "../../../../routine/wait";
import MenuService from "../../../../services/menu-service";
import { menuConfig } from "../../menu-config";
import Ls from "../../../../services/local-storage-service";

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
            let asTarasB = Ls.get('asTaras')
            const toggle = this.find('#asTarasToggle')
            asTarasB && toggle.setAttribute('checked', 'true')
            asTarasB || toggle.removeAttribute('checked')

            On.change(toggle, () => {
                asTarasB = !asTarasB
                Ls.set({ asTaras: asTarasB })
                Wait.for(450).then(() => mut('asTaras', asTarasB))
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
