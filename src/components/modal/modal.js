import EventHandler from "../../event-handler/event-handler";
import Component from "../component";
import Factory from "../component-factory";
import template from './modal.html'

export default class ModalComponent extends Component {
    #backBtn = undefined
    #closeBtn = undefined
    #contentInstance = undefined

    mount({ anchor, modalData }) {
        super.mount({
            anchor,
            template,
            display: 'inherit'
        })

        const { titleTemplate, contentRef, data, onClose } = modalData
        const modalTitle = this.find('#modalTitle')

        if (titleTemplate) {
            modalTitle.innerHTML = titleTemplate
        }

        if (contentRef) {
            this.#createContentInstance(contentRef, data)
            this.#backBtn = this.find('#backBtn svg')

            EventHandler.sub(this.#backBtn, 'click', () => {
                this.#contentInstance && this.#contentInstance.unmount()
                this.#backBtn.style.display = 'none'
                modalTitle.innerHTML = titleTemplate
                this.#createContentInstance(contentRef, data)
            })
        }

        this.#closeBtn = this.find('#closeModalBtn')
        EventHandler.sub(this.#closeBtn, 'click', () => {
            this.unmount()
            onClose && onClose()
        })
    }

    unmount() {
        this.#contentInstance && this.#contentInstance.unmount()
        this.#backBtn && EventHandler.unsub(this.#backBtn)
        this.#closeBtn && EventHandler.unsub(this.#closeBtn)
        super.unmount()
    }

    #createContentInstance(contentRef, data) {
        if (contentRef) {
            const contentInstance = Factory.mount(contentRef, {
                anchor: 'modalContent',
                dialogRef: this,
                data
            })
            this.#contentInstance = contentInstance
        }
    }
}
