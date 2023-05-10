import ChartDrawings from '../chart/chartDrawings';
import Container from '../components/container/container'
import UtilsService from '../services/utils-service';
import FirebaseService from '../services/firebase-service';
import Factory from '../components/component-factory';
import Wait from '../routine/wait';
import Ls from './local-storage-service';
import { mut } from 'tieder'
import { storeConfig } from '../config/store-config';
import ThemeService from './theme-service';

export default class StarterService {
    static async start() {

        ThemeService.init()

        const warDay = UtilsService.warDay
        const container = Factory.mount(Container)

        UtilsService.setPrevSize()

        const db = FirebaseService.initialize()
        const drawings = new ChartDrawings('chart', warDay, 7)

        const lastUpdateLs = Ls.get('lastUpdate')
        if (lastUpdateLs === undefined || lastUpdateLs === null || lastUpdateLs !== UtilsService.date(Date.now())) {
            const data = await db.get()
            const sorted = data.sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
            mut(storeConfig.eventData, sorted)
            container.loader.unmount()
            drawings.draw({ darker: 'var(--chart-darker)', dark: 'var(--chart-spots-color)', bright: 'var(--main-text-color)', blue: '#53b1f9', yellow: 'var(--yellow-color)', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
            Ls.set({
                lastUpdate: UtilsService.date(Date.now()),
                emotionsData: JSON.stringify(sorted)
            })
        } else {
            await Wait.for(600)
            container.loader.unmount()
            const dataLs = Ls.get('emotionsData')
            const sorted = JSON.parse(dataLs).sort((prev, next) => parseInt(prev.day) > parseInt(next.day) ? 1 : -1)
            mut(storeConfig.eventData, sorted)
            drawings.draw({ darker: 'var(--chart-darker)', dark: 'var(--chart-spots-color)', bright: 'var(--main-text-color)', blue: '#53b1f9', yellow: 'var(--yellow-color)', red: '#ff5f5f', zero: 'white', zeroStroke: '#ff5f5f' })
        }
    }
}