import Component from "../component"
import template from './action-panel.html'
import { mut } from 'tieder'
import UtilsService from "../../services/utils-service"
import On from "../../event-handler/on"

export default class ActionPanel extends Component {
    mount({ anchor }) {
        super.mount({
            anchor,
            template
        })

        if (UtilsService.isMobile) {
            const def = this.find('#coption')
            def.classList.add('opt-active')
            def.classList.remove('opt-inactive')

            On.click(this.element, e => {
                const els = this.findAll('.label')
                const el = e.target.closest('.label')

                if (!el) {
                    return
                }
                for (let i = 0; i < els.length; i++) {
                    els[i].classList.remove('opt-active')
                    els[i].classList.add('opt-inactive')
                }

                el && el.classList.remove('opt-inactive')
                el && el.classList.add('opt-active')

                mut('onOptionClick', el.id)
            })

            mut('onOptionClick', 'coption')
        } else {
            this.find('#coption').style.cursor = 'default'
            this.find('#soption').style.cursor = 'default'
            this.find('#eoption').style.cursor = 'default'
        }
    }
}
