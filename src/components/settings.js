import template from './settings.html'
import howWorks from './howWorks.html'
import about from './about2.html'
import { Store } from '../js/store/store2'

export class SettingsComponent {
    static inject(data) {
        const aboutMask = document.getElementById('aboutMask')
        aboutMask.innerHTML = template
        aboutMask.style.display = 'inherit'
        const closeBtn = document.getElementById('closePopupBtn')
        

        const asTaras = document.getElementById('asTaras')
        data && data.isMobile && asTaras.remove()

        const content = document.getElementById('settingsContent')
        let howWorksB = true
        let aboutB = true
        let asTarasB = localStorage.getItem('asTaras') == 1 ? true : false
        
        document.getElementById('howWorksContent').innerHTML = howWorks
        document.getElementById('aboutContent').innerHTML = about

        if (data && !data.isMobile) {
            const toggle = document.getElementById('asTarasToggle')
            asTarasB && toggle.setAttribute('checked', 'true')
            asTarasB || toggle.removeAttribute('checked')
            
            toggle.addEventListener('change', () => {
                asTarasB = !asTarasB
                Store.mut('asTaras', asTarasB)
                localStorage.setItem('asTaras', asTarasB ? 1 : 0)
            })
        }

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

        closeBtn.addEventListener('click', () => {
            aboutMask.style.display = 'none'
            aboutMask.innerHTML = ''
        })
    }
}
