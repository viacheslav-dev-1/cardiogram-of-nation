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

(Init.isMobile ? loadMobileStyles() : loadDesktopStyles()).then(start)

function start() {
    document.getElementById('container').style.display = 'flex'

    Init.store()

    const warDay = Init.warDay
    HeaderComponent.inject({ warDay })
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
