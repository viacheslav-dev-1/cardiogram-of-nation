import Component from "../../../component";
import Store from "../../../../store/store2";
import template from "./content-part.html"
import info from "../info-part/info-part.html"
import zero from "../zero-part/zero-part.html"
import video from "../video-part/video-part.html"
import UtilsService from "../../../../services/utils-service";
import On from "../../../../event-handler/on";
import Wait from "../../../../routine/wait";

export default class MenuContentPart extends Component {
    #items = []
    
    mount(modalData) {
        const { anchor, dialogRef } = modalData
        super.mount({
            anchor,
            template
        })

        if (UtilsService.isMobile) {
            this.find('#asTaras').remove()
        } else {
            let asTarasB = localStorage.getItem('asTaras') == 1 ? true : false
            const toggle = this.find('#asTarasToggle')
            asTarasB && toggle.setAttribute('checked', 'true')
            asTarasB || toggle.removeAttribute('checked')

            On.change(toggle, () => {
                asTarasB = !asTarasB
                localStorage.setItem('asTaras', asTarasB ? 1 : 0)
                Wait.for(450).then(() => Store.mut('asTaras', asTarasB))
            })

            this.#items.push(toggle)
        }

        const backBtn = dialogRef.find('#backBtn svg')
        const title = dialogRef.find('#menuTitle')
        const content = this.find('#menuContent')
        
        const infoItem = this.find('#infoItem')
        On.click(infoItem, () => {
            backBtn.style.display = 'block'
            title.innerText = 'Інформація'
            content.innerHTML = info
        })
        this.#items.push(infoItem)

        const zeroItem = this.find('#zeroItem')
        On.click(zeroItem, () => {
            backBtn.style.display = 'block'
            title.innerText = 'Стани Zero-Point'
            content.innerHTML = zero
        })
        this.#items.push(zeroItem)

        const ipsoItem = this.find('#ipsoItem')
        On.click(ipsoItem, () => {
            backBtn.style.display = 'block'
            title.innerText = 'Як працюють складні ІПсО на конкретні цільові аудиторії'
            content.innerHTML = video
            this.find('#videoDate').innerText = '24 лют. 2023 р.'
            this.find('#videoDescription').innerText = 'Впродовж місяця ми дуже поглиблено вивчали ІПсО. Слід зазначити, що ворог змінив підхід. Зараз часто ІПсО відбуваються зі складним нашаруванням. Що це значить та як працює - розбираю.'
            
            const openYoutube = this.find('#openYoutube')
            On.click(openYoutube, () => window.open('https://youtu.be/vysz3M0WdUM', '_blank'))
            this.#items.push(openYoutube)
            this.find('#videoContainer iframe').src = 'https://www.youtube.com/embed/vysz3M0WdUM'
        })
        this.#items.push(ipsoItem)
    }

    unmount() {
        this.#items.forEach(item => On.unsub(item))
    }
}
