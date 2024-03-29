import UtilsService from '../../../services/utils-service'
import { subject } from 'tieder'
import Component from '../../component'
import template from './content-part.html'
import { storeConfig } from '../../../config/store-config'

export default class DetailsContentPart extends Component {
    mount(modalData) {
        const { anchor, dialogRef, data } = modalData
        super.mount({
            anchor,
            template
        })

        dialogRef.find('#dayTitle').innerText = data.day

        const result = new Date('02/24/2022')
        result.setDate(result.getDate() + data.day)
        let dayV = result.getUTCDate()
        dayV = dayV < 10 ? '0' + dayV : dayV
        let monthV = result.getUTCMonth() + 1
        monthV = monthV < 10 ? '0' + monthV : monthV
        const yearV = result.getUTCFullYear();
        dialogRef.find('#dateTitle').innerText = `${dayV}.${monthV}.${yearV}`


        const dayData = subject(storeConfig.eventData).cur.filter(it => it.day === data.day)[0]
        this.find('#cFeel').innerText = dayData?.cFeel ? dayData.cFeel : "-"
        this.find('#sFeel').innerText = dayData?.sFeel ? dayData.sFeel : "-"
        this.find('#eFeel').innerText = dayData?.eFeel ? dayData.eFeel : "-"
        this.find('#trigger').innerText = dayData?.trigger ? dayData.trigger : "-"
        this.find('#cZero').style.display = dayData?.cZero === true ? '' : 'none'
        this.find('#sZero').style.display = dayData?.sZero === true ? '' : 'none'

        const day = data.day < 10 ? '0'+data.day : data.day
        const ia = data.day > 400 ? '' : '.ia'
        const src = `https://ia601605.us.archive.org/12/items/taras_bilka_bilchenia-cardiogram_of_ukraine_nation/${day}_taras_bilka-chronicles_of_ua_war-day_${data.day}${ia}.mp4`
        
        if (UtilsService.isIOS && data.day > 400) {
            this.find('#videoContainer').style.display = 'none'
            this.find('#warningPanel').style.display = 'block'
            this.find('#videoLink').href = src
        } else {
            this.find('#video source').src = src
        }
    }
}
