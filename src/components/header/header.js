import { mut } from 'tieder'
import Component from '../component'
import ModalComponent from '../modal/modal'
import MenuContentPart from '../menu-modal/parts/content-part/content-part'
import UtilsService from '../../services/utils-service'
import template from './header.html'
import titleTemplate from '../menu-modal/parts/title-part/title-part.html'
import Factory from '../component-factory'
import On from '../../event-handler/on'

export default class HeaderComponent extends Component {
    mount({ anchor }) {
        super.mount({
            anchor,
            template
        })

        const warDay = UtilsService.warDay
        const daysInput = this.find('#war-day-input')
        daysInput.value = warDay
        daysInput.maxLength = warDay.toString().length

        On.few(daysInput, {
            input: () => {
                daysInput.value < 1 || daysInput.value > warDay && (daysInput.value = warDay)
                mut('daysInput', daysInput.value)
            },
            keypress: e => e.key.length === 1 && /\D/.test(e.key) && e.preventDefault()
        })

        const menu = this.find('#menu')
        On.click(menu, () => Factory.mount(ModalComponent, { modalData: { titleTemplate, contentRef: MenuContentPart } }))
    }
}
