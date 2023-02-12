import template from './about.html'

export class AboutComponent {
    static inject() {
        const aboutMask = document.getElementById('aboutMask')
        aboutMask.innerHTML = template
        aboutMask.style.display = 'inherit'
        const closeBtn = document.getElementById('closePopupBtn')
        closeBtn.addEventListener('click', () => {
            aboutMask.style.display = 'none'
            aboutMask.innerHTML = ''
        })
    }
}