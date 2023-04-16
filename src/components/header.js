import template from './header.html'
import { Store } from '../js/store/store2'

export class HeaderComponent {
    static inject(data) {
        document.getElementById('header').innerHTML = template

        const warDay = data.warDay
        const daysInput = document.getElementById('war-day-input')

        if (data.isMobile) {
            daysInput.addEventListener('click', () => {
                daysInput.style.scale = '3'
            })

            document.body.addEventListener('click', e => {
                e.target.id === 'war-day-input' ||
                    (daysInput.style.scale = '1')
            })
        }
        
        daysInput.value = warDay
        daysInput.maxLength = warDay.toString().length
        daysInput.addEventListener('input', () => {
            daysInput.value < 1 || daysInput.value > warDay && (daysInput.value = warDay)
            Store.mut('daysInput', daysInput.value)
        })
        daysInput.addEventListener('keypress', e => e.key.length === 1 && /\D/.test(e.key) && e.preventDefault())
    }
}
