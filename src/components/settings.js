import template from './settings.html'
import howWorks from './howWorks.html'
import about from './about2.html'

export class SettingsComponent {
    static inject(data) {
        const aboutMask = document.getElementById('aboutMask')
        aboutMask.innerHTML = template
        aboutMask.style.display = 'inherit'
        const closeBtn = document.getElementById('closePopupBtn')
        closeBtn.addEventListener('click', () => {
            aboutMask.style.display = 'none'
            aboutMask.innerHTML = ''
        })

        const content = document.getElementById('settingsContent')
        let howWorksB = true
        let aboutB = true
        
        document.getElementById('howWorksContent').innerHTML = howWorks
        document.getElementById('aboutContent').innerHTML = about

        content.addEventListener('click', e => {
            if (e && e.target) {
                if (e.target.closest('#howWorks')) {
                    document.getElementById('howWorksContent').innerHTML = howWorksB ? '' : howWorks
                    howWorksB = !howWorksB
                }
                else if (e.target.closest('#about')) {
                    document.getElementById('aboutContent').innerHTML = aboutB ? '' : about
                    aboutB = !aboutB
                }
            }
        })
    }
}
