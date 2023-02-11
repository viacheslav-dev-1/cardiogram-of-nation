import template from './modal.html'

export class ModalComponent {
    static inject() {
        const modalMask = document.getElementById('modalMask')
        modalMask.innerHTML = template
        modalMask.style.display = 'inherit'
        const closeBtn = document.getElementById('closePopupBtn')
        closeBtn.addEventListener('click', () => {
            modalMask.style.display = 'none'
            modalMask.innerHTML = ''
        })
    }
}
