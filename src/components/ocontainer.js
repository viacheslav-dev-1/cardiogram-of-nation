import template from './ocontainer.html'
import { Store } from '../js/store/Store'

export class Ocontainer {
    static inject(data) {
        const isMobile = data.isMobile
        if (isMobile) {
            
            const container = document.getElementById('ocontainerTop')
            container.innerHTML = template
            
            const def = document.getElementById('coption')
            def.classList.add('opt-active')
            def.classList.remove('opt-inactive')

            Store.mut('onOptionClick', 'coption')

            container.addEventListener('click', e => {
                const els = document.getElementsByClassName('label')
                const el = e.target.closest('.label')

                if (!el) {
                    return
                }
                for (let i = 0; i < els.length; i++) {
                    els[i].classList.remove('opt-active')
                    els[i].classList.add('opt-inactive')
                }

                el && el.classList.remove('opt-inactive')
                el && el.classList.add('opt-active')

                Store.mut('onOptionClick', el.id)
            })
        } else {
            const container = document.getElementById('ocontainerBottom')
            container.innerHTML = template

            document.getElementById('coption').style.cursor = 'default'
            document.getElementById('soption').style.cursor = 'default'
            document.getElementById('eoption').style.cursor = 'default'
        }
    }
}
