import { MenuItems } from './menu-items'
import template from './menu.html'

export class MenuComponent {
    static inject(data) {
        const modalMask = document.getElementById('aboutMask')
        modalMask.innerHTML = template
        modalMask.style.display = 'inherit'

        MenuItems.inject(data)

        const closeBtn = document.getElementById('closePopupBtn')
        closeBtn.addEventListener('click', () => {
            modalMask.style.display = 'none'
            modalMask.innerHTML = ''
        })
    }
}