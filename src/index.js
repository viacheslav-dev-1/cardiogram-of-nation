import './styles.scss'
import './styles/toggle.scss'
import './images/favicon.png'
import { Init } from './js/init'
import { Db } from './js/db';
import { ChartDrawings } from './js/chart/chartDrawings';
import LoaderComponent from './components/loader/loader'
import { Store } from './js/store/store2'
import Container from './components/container/container'

(Init.isMobile ? loadMobileStyles() : loadDesktopStyles()).then(start)

window.addEventListener('resize', () => {
    const prevMob = Store.get('prevMob')?.cur
    const prevHor = Store.get('prevHor')?.cur
    const { innerWidth, innerHeight } = window

    if ((prevMob === 'm' && !(innerWidth < 800 && innerHeight < 800)) ||
        (prevMob === 'd' && innerWidth < 800 && innerHeight < 800) ||
        (prevHor === 'v' && innerHeight < 600 || (prevHor === 'h' && !(innerHeight < 600)))) {
        location.reload()
    }
})

async function start() {
    Init.store()
    const warDay = Init.warDay
    await new Container().mount({ warDay, isMobile: Init.isMobile, isHorizontal: Init.isHorizontal })

    Store.mut('prevMob', window.innerWidth < 800 && window.innerHeight < 800 ? 'm' : 'd')
    Store.mut('prevHor', window.innerHeight < 600 ? 'h' : 'v')

    const loader = new LoaderComponent()
    await loader.mount()

    Init.firebase()

    const db = new Db()
    const drawings = new ChartDrawings('chart', warDay, 7)

    const lastUpdateLs = localStorage.getItem('lastUpdate')
    if (lastUpdateLs === undefined || lastUpdateLs === null || lastUpdateLs !== Init.date(Date.now())) {
        db.get().then(data => {
            const sorted = data.sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
            Store.mut('eventData', sorted)
            loader.unmount()
            drawings.draw({ darker: 'black', dark: '#3e3e3e', bright: '#c9c9c9', blue: '#53b1f9', yellow: '#fffb00', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
            localStorage.setItem('lastUpdate', Init.date(Date.now()))
            localStorage.setItem('emotionsData', JSON.stringify(sorted))
        })
    } else {
        setTimeout(() => {
            loader.unmount()
            const dataLs = localStorage.getItem('emotionsData')
            const sorted = JSON.parse(dataLs).sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
            Store.mut('eventData', sorted)
            drawings.draw({ darker: 'black', dark: '#3e3e3e', bright: '#c9c9c9', blue: '#53b1f9', yellow: '#fffb00', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
        }, 500)
    }
}

async function loadDesktopStyles() {
    return await import('./styles/chart.scss')
}

async function loadMobileStyles() {
    return await import('./styles/chart.scss')
}
