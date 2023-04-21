import { Store } from '../../js/store/store2'
import Component from '../component'
import ModalComponent from '../modal/modal'
import MenuContentPart from '../menu-modal/parts/content-part/content-part'
import template from './header.html'
import titleTemplate from '../menu-modal/parts/title-part/title-part.html'

export default class HeaderComponent extends Component {
    async mount({ warDay, isMobile }) {
        await super.mount({
            anchor: 'header',
            template
        })

        const daysInput = this.find('#war-day-input')
        daysInput.value = warDay
        daysInput.maxLength = warDay.toString().length
        daysInput.addEventListener('input', () => {
            daysInput.value < 1 || daysInput.value > warDay && (daysInput.value = warDay)
            Store.mut('daysInput', daysInput.value)
        })

        daysInput.addEventListener('keypress', e => e.key.length === 1 && /\D/.test(e.key) && e.preventDefault())

        const menu = this.find('#menu')
        menu.addEventListener('click', () => {
            new ModalComponent().mount({isMobile, modalData: {
                titleTemplate,
                contentRef: MenuContentPart
            }})
        })
    }
}
