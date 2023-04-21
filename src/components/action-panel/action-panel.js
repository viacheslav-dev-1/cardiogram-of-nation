import Component from "../component"
import template from './action-panel.html'
import Store from '../../store/store2'
import UtilsService from "../../services/utils-service"
import EventHandler from "../../event-handler/event-handler"

export default class ActionPanel extends Component {
    mount(anchor) {
        super.mount({
            anchor,
            template
        })

        if (UtilsService.isMobile) {
            const def = this.find('#coption')
            def.classList.add('opt-active')
            def.classList.remove('opt-inactive')

            EventHandler.sub(this.element, 'click', e => {
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

                Store.mut('onOptionClick', el.id)
            })

            Store.mut('onOptionClick', 'coption')
        } else {
            this.find('#coption').style.cursor = 'default'
            this.find('#soption').style.cursor = 'default'
            this.find('#eoption').style.cursor = 'default'
        }
    }
}
