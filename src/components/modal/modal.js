import On from "../../event-handler/on";
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

            On.click(this.#backBtn, () => {
                this.#contentInstance && this.#contentInstance.unmount()
                this.#backBtn.style.display = 'none'
                modalTitle.innerHTML = titleTemplate
                this.#createContentInstance(contentRef, data)
            })
        }

        this.#closeBtn = this.find('#closeModalBtn')

        On.click(this.#closeBtn, () => {
            this.unmount()
            onClose && onClose()
        })
    }

    unmount() {
        this.#contentInstance && this.#contentInstance.unmount()
        this.#backBtn && On.unsub(this.#backBtn)
        this.#closeBtn && On.unsub(this.#closeBtn)
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
            this.find('#modalContent').scrollTo(0, 0)
        }
    }
}
