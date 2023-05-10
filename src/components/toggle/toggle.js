import On from "../../event-handler/on";
import Component from "../component";
import template from './toggle.html'
import './toggle.scss'

export class ToggleComponent extends Component {
    #toggle = undefined

    mount({ anchor, data }) {
        super.mount({
            anchor,
            template
        })

        const toggle = this.find('.toggle-input')
        let checked = data.checked
        checked && toggle.setAttribute('checked', 'true')
        checked || toggle.removeAttribute('checked')

        On.change(toggle, () => {
            data.onChange(!checked)
            checked = !checked
        })

        this.#toggle = toggle
    }

    unmount() {
        On.unsub(this.#toggle)
    }
}