import { ChartDrawings } from '../js/chart/chartDrawings';
import LoaderComponent from '../components/loader/loader'
import { Store } from '../js/store/store2'
import Container from '../components/container/container'
import UtilsService from '../services/utils-service';
import FirebaseService from '../services/firebase-service';

export default class StarterService {
    static async start() {
        Store.init()

        const warDay = UtilsService.warDay
        await new Container().mount({ warDay, isMobile: UtilsService.isMobile, isHorizontal: UtilsService.isHorizontal })

        UtilsService.setPrevSize()

        const loader = new LoaderComponent()
        await loader.mount()

        const db = FirebaseService.initialize()
        const drawings = new ChartDrawings('chart', warDay, 7)

        const lastUpdateLs = localStorage.getItem('lastUpdate')
        if (lastUpdateLs === undefined || lastUpdateLs === null || lastUpdateLs !== UtilsService.date(Date.now())) {
            db.get().then(data => {
                const sorted = data.sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
                Store.mut('eventData', sorted)
                loader.unmount()
                drawings.draw({ darker: 'black', dark: '#3e3e3e', bright: '#c9c9c9', blue: '#53b1f9', yellow: '#fffb00', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
                localStorage.setItem('lastUpdate', UtilsService.date(Date.now()))
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
}