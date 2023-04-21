import Store from '../../store/store2'
import Component from '../component'
import ModalComponent from '../modal/modal'
import MenuContentPart from '../menu-modal/parts/content-part/content-part'
import UtilsService from '../../services/utils-service'
import template from './header.html'
import titleTemplate from '../menu-modal/parts/title-part/title-part.html'
import EventHandler from '../../event-handler/event-handler'

export default class HeaderComponent extends Component {
    mount(anchor) {
        super.mount({
            anchor,
            template
        })

        const warDay = UtilsService.warDay
        const daysInput = this.find('#war-day-input')
        daysInput.value = warDay
        daysInput.maxLength = warDay.toString().length

        const events = [
            {
                event: 'input',
                func: () => {
                    daysInput.value < 1 || daysInput.value > warDay && (daysInput.value = warDay)
                    Store.mut('daysInput', daysInput.value)
                }
            },
            {
                event: 'keypress',
                func: e => e.key.length === 1 && /\D/.test(e.key) && e.preventDefault()
            }
        ]

        EventHandler.subFew(daysInput, events)

        EventHandler.sub(this.find('#menu'), 'click', () => {
            new ModalComponent().mount({
                modalData: {
                    titleTemplate,
                    contentRef: MenuContentPart
                }
            })
        })
    }
}
