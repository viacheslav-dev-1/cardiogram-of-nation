import ChartDrawings from '../chart/chartDrawings';
import Container from '../components/container/container'
import UtilsService from '../services/utils-service';
import FirebaseService from '../services/firebase-service';
import Factory from '../components/component-factory';
import Wait from '../routine/wait';
import Ls from './local-storage-service';
import Store from 'a-simple-store/src/store'

export default class StarterService {
    static async start() {

        const warDay = UtilsService.warDay
        const container = Factory.mount(Container)

        UtilsService.setPrevSize()

        const db = FirebaseService.initialize()
        const drawings = new ChartDrawings('chart', warDay, 7)

        const lastUpdateLs = Ls.get('lastUpdate')
        if (lastUpdateLs === undefined || lastUpdateLs === null || lastUpdateLs !== UtilsService.date(Date.now())) {
            const data = await db.get()
            const sorted = data.sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
            Store.$.mut('eventData', sorted)
            container.loader.unmount()
            drawings.draw({ darker: 'black', dark: '#3e3e3e', bright: '#c9c9c9', blue: '#53b1f9', yellow: '#fffb00', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
            Ls.set({
                lastUpdate: UtilsService.date(Date.now()),
                emotionsData: JSON.stringify(sorted)
            })
            
        } else {
            
            await Wait.for(600)
            
            container.loader.unmount()
            const dataLs = Ls.get('emotionsData')
            const sorted = JSON.parse(dataLs).sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
            Store.$.mut('eventData', sorted)
            drawings.draw({ darker: 'black', dark: '#3e3e3e', bright: '#c9c9c9', blue: '#53b1f9', yellow: '#fffb00', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
        }
    }
}