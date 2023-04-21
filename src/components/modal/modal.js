import Component from "../component";
import template from './modal.html'

export default class ModalComponent extends Component {
    mount({ modalData }) {
        super.mount({
            anchor: 'modalMask',
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
            const backBtn = this.find('#backBtn').querySelector('svg')
            backBtn.addEventListener('click', () => {
                backBtn.style.display = 'none'
                modalTitle.innerHTML = titleTemplate
                this.#createContentInstance(contentRef, data)
            })
        }

        this.find('#closeModalBtn').addEventListener('click', () => {
            this.unmount()
            onClose && onClose()
        })
    }

    #createContentInstance(contentRef, data) {
        if (contentRef) {
            const contentInstance = new contentRef()
            contentInstance.mount({
                anchor: 'modalContent',
                dialogRef: this,
                data
            })
        }
    }
}
