import Component from "../../../component";
import { mut } from 'tieder'
import template from "./content-part.html"
import UtilsService from "../../../../services/utils-service";
import On from "../../../../event-handler/on";
import MenuService from "../../../../services/menu-service";
import { menuConfig } from "../../menu-config";
import Ls from "../../../../services/local-storage-service";
import { storeConfig } from "../../../../config/store-config";
import Factory from "../../../component-factory";
import { ToggleComponent } from "../../../toggle/toggle";
import ThemeService from "../../../../services/theme-service";

export default class MenuContentPart extends Component {
    #items = []
    #refs = []
    
    mount(modalData) {
        const { anchor, dialogRef } = modalData
        super.mount({
            anchor,
            template
        })

        if (UtilsService.isMobile) {
            this.find('#asTaras').remove()
        } else {
            const asTarasB = Ls.get('asTaras')
            const onChange = checked => {
                Ls.set({ asTaras: checked })
                mut(storeConfig.asTaras, checked)
            }

            const tarasToggle = Factory.mount(ToggleComponent, { anchor: 'asTarasToggle', data: { checked: asTarasB, onChange } })
            this.#refs.push(tarasToggle)
        }


        const themeLs = Ls.get('theme')
        const light = themeLs === 'light'
        const themeChange = checked => {
            const theme = checked ? 'light' : 'dark'
            Ls.set({ theme })
            ThemeService.apply(theme)
        }

        const themeToggle = Factory.mount(ToggleComponent, { anchor: 'themeToggle', data: { checked: light, onChange: themeChange } })
        this.#refs.push(themeToggle)

        MenuService.instance.build(dialogRef, menuConfig)
    }

    unmount() {
        this.#items.forEach(item => On.unsub(item))
        MenuService.instance.destroy()
        this.#refs.forEach(ref => ref.unmount())
    }
}
