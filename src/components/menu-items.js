import menuItems from './menu-items.html'
import zeroPoints from './menu-views/zero-points.html'
import info from './menu-views/info.html'
import { Store } from '../js/store/store2'

export class MenuItems {
    static inject(data) {
        const menuContent = document.getElementById('menuContent')
        menuContent.innerHTML = menuItems
        menuContent.scrollTo(0, 0)
        
        const menutTitle = document.getElementById('menuTitle');
        
        const backBtn = document.getElementById('backBtn')
        backBtn.addEventListener('click', () => {
            backBtn.getElementsByTagName('svg')[0].style.display = 'none'
            menutTitle.innerText = 'Меню'
            this.inject(data)
        })

        const zeroItem = document.getElementById('zeroItem')
        zeroItem.addEventListener('click', () => {
            backBtn.getElementsByTagName('svg')[0].style.display = 'block'
            menutTitle.innerText = 'Стани Zero-Point'
            menuContent.innerHTML = zeroPoints
        })

        const infoItem = document.getElementById('infoItem')
        infoItem.addEventListener('click', () => {
            backBtn.getElementsByTagName('svg')[0].style.display = 'block'
            menutTitle.innerText = 'Інформація'
            menuContent.innerHTML = info
        })

        const asTaras = document.getElementById('asTaras')
        data && data.isMobile && asTaras.remove()
        
        let asTarasB = localStorage.getItem('asTaras') == 1 ? true : false

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
    }
}