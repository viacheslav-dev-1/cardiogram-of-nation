import { Store } from '../js/store/store2'
import template from '../components/details.html'

export class DetailsComponent {
    static inject(data) {
        const modalMask = document.getElementById('modalMask')
        modalMask.innerHTML = template
        modalMask.style.display = 'inherit'
        const closeBtn = document.getElementById('closePopupBtn')
        closeBtn.addEventListener('click', () => {
            modalMask.style.display = 'none'
            modalMask.innerHTML = ''
        })

        const detailsDay = document.getElementById('detailsDay')
        detailsDay.innerHTML = `<a>${data} день війни</a>`

        const dayData = Store.get('eventData').cur.filter(it => it.day === data)[0]
        document.getElementById('cFeel').innerText = dayData?.cFeel ? dayData.cFeel : "-"
        document.getElementById('sFeel').innerText = dayData?.sFeel ? dayData.sFeel : "-"
        document.getElementById('eFeel').innerText = dayData?.eFeel ? dayData.eFeel : "-"
        document.getElementById('trigger').innerText = dayData?.trigger ? dayData.trigger : "-"

        const day = data < 10 ? '0'+data : data
        document.getElementById('video')
            .getElementsByTagName('source')[0]
            .src = `https://ia601605.us.archive.org/12/items/taras_bilka_bilchenia-cardiogram_of_ukraine_nation/${day}_taras_bilka-chronicles_of_ua_war-day_${data}.ia.mp4`
    }
}
