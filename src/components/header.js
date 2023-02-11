import template from './header.html'
import { Store } from '../js/store/Store'

export class HeaderComponent {
    static inject(data) {
        document.getElementById('header').innerHTML = template

        const warDay = data.warDay
        const daysInput = document.getElementById('war-day-input')
        daysInput.value = warDay
        daysInput.maxLength = warDay.toString().length
        daysInput.addEventListener('input', () => {
            daysInput.value < 1 || daysInput.value > warDay && (daysInput.value = warDay)
            Store.mut('daysInput', daysInput.value)
        })
        daysInput.addEventListener('keypress', e => e.key.length === 1 && /\D/.test(e.key) && e.preventDefault())
    }
}
