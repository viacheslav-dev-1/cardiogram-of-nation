import './styles.scss'
import './styles/header.scss'
import './styles/loader.scss'
import './images/favicon.png'
import { Init } from './js/init'
import { Db } from './js/db';
import { ChartDrawings } from './js/chart/chartDrawings';
import { Store } from './js/store/Store'

const imports = Init.isMobile ? loadMobileStyles() : loadDesktopStyles()
imports.then(start)

function start() {
    document.getElementById('container').style.display = 'flex'
    
    Init.store()

    /* Load styles */
    if (Init.isMobile)
        loadMobileStyles()
    else
        loadDesktopStyles()

    /* Init settings */
    const warDay = Init.warDay
    const daysInput = document.getElementById('war-day-input')
    daysInput.value = warDay
    daysInput.maxLength = warDay.toString().length
    daysInput.addEventListener('input', () => {
        daysInput.value < 1 || daysInput.value > warDay && (daysInput.value = warDay)
        Store.mut('daysInput', daysInput.value)
    })
    daysInput.addEventListener('keypress', e => e.key.length === 1 && /\D/.test(e.key) && e.preventDefault())
    daysInput.addEventListener('wheel', e => daysInput.value = parseInt(daysInput.value) + (e.deltaY < 0 ? daysInput.value > warDay - 1 ? 0 : 1 : daysInput.value < 2 ? 0 : -1))

    Init.firebase()
    Init.menu()

    const db = new Db()
    const drawings = new ChartDrawings('chart', warDay, 7)

    /* Draw chart */
    const lastUpdateLs = localStorage.getItem('lastUpdate')
    if (lastUpdateLs === undefined || lastUpdateLs === null || lastUpdateLs !== Init.date(Date.now())) {
        db.get().then(data => {
            const sorted = data.sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
            document.getElementById('loader').style.display = 'none'
            drawings.draw(sorted, { darker: 'black', dark: '#3e3e3e', bright: '#c9c9c9', blue: '#53b1f9', yellow: '#fffb00', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
            localStorage.setItem('lastUpdate', Init.date(Date.now()))
            localStorage.setItem('emotionsData', JSON.stringify(sorted))
        })
    } else {
        document.getElementById('loader').style.display = 'none'

        const dataLs = localStorage.getItem('emotionsData')
        drawings.draw(JSON.parse(dataLs), { darker: 'black', dark: '#3e3e3e', bright: '#c9c9c9', blue: '#53b1f9', yellow: '#fffb00', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
    }
}

function loadDesktopStyles() {
    document.getElementsByClassName('top-action-panel')[0].style.display = 'none'
    
    return import('./styles/modal.scss')
        .then(() => import('./styles/chart.scss')
                        .then(() => import('./styles/header-desktop.scss')))
}

function loadMobileStyles() {
    document.getElementsByClassName('bottom-action-panel')[0].style.display = 'none'

    return import('./styles/modal-mobile.scss')
        .then(() => import('./styles/chart.scss')
                        .then(() => import('./styles/header-mobile.scss')))
}
