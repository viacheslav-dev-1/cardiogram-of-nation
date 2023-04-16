import './styles.scss'
import './styles/toggle.scss'
import './styles/header.scss'
import './styles/loader.scss'
import './images/favicon.png'
import { Init } from './js/init'
import { Db } from './js/db';
import { ChartDrawings } from './js/chart/chartDrawings';
import { HeaderComponent } from './components/header'
import { LoaderComponent } from './components/loader'
import { Store } from './js/store/store2'
import { Container } from './components/container'

(Init.isMobile ? loadMobileStyles() : loadDesktopStyles()).then(start)

window.addEventListener('resize', () => {
    const prevMob = Store.get('prevMob')?.cur
    const prevHor = Store.get('prevHor')?.cur
    const { innerWidth, innerHeight } = window

    if ((prevMob === 'm' && !(innerWidth < 800 && innerHeight < 800)) ||
        (prevMob === 'd' && innerWidth < 800 && innerHeight < 800) ||
        (prevHor === 'v' && innerHeight < 600 || (prevHor === 'h' && !(innerHeight < 600 )))) {
        location.reload()
    }
})

function start() {
    Container.inject(Init.isMobile).style.display = 'flex'
    Init.store()

    Store.mut('prevMob', window.innerWidth < 800 && window.innerHeight < 800 ? 'm' : 'd')
    Store.mut('prevHor', window.innerHeight < 600 ? 'h' : 'v')

    const warDay = Init.warDay
    HeaderComponent.inject({ warDay, isMobile: Init.isMobile })
    LoaderComponent.inject()

    Init.firebase()
    Init.menu()

    const db = new Db()
    const drawings = new ChartDrawings('chart', warDay, 7)

    const lastUpdateLs = localStorage.getItem('lastUpdate')
    if (lastUpdateLs === undefined || lastUpdateLs === null || lastUpdateLs !== Init.date(Date.now())) {
        db.get().then(data => {
            const sorted = data.sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
            Store.mut('eventData', sorted)
            LoaderComponent.eject()
            drawings.draw({ darker: 'black', dark: '#3e3e3e', bright: '#c9c9c9', blue: '#53b1f9', yellow: '#fffb00', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
            localStorage.setItem('lastUpdate', Init.date(Date.now()))
            localStorage.setItem('emotionsData', JSON.stringify(sorted))
        })
    } else {
        setTimeout(() => {
            LoaderComponent.eject()
            const dataLs = localStorage.getItem('emotionsData')
            const sorted =  JSON.parse(dataLs).sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
            Store.mut('eventData', sorted)
            drawings.draw({ darker: 'black', dark: '#3e3e3e', bright: '#c9c9c9', blue: '#53b1f9', yellow: '#fffb00', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
        }, 500)
    }
}

async function loadDesktopStyles() {
    await import('./styles/modal.scss')
    await import('./styles/chart.scss')
    return await import('./styles/header-desktop.scss')
}

async function loadMobileStyles() {
    await import('./styles/modal-mobile.scss')
    await import('./styles/chart.scss')
    return await import('./styles/header-mobile.scss')
}
