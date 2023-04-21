import Component from "../component";
import template from './modal.html'

export default class ModalComponent extends Component {
    async mount({ modalData }) {
        await super.mount({
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
            await this.#createContentInstance(contentRef, data)
            const backBtn = this.find('#backBtn').querySelector('svg')
            backBtn.addEventListener('click', async () => {
                backBtn.style.display = 'none'
                modalTitle.innerHTML = titleTemplate
                await this.#createContentInstance(contentRef, data)
            })
        }

        this.find('#closeModalBtn').addEventListener('click', () => {
            this.unmount()
            onClose && onClose()
        })
    }

    async #createContentInstance(contentRef, data) {
        if (contentRef) {
            const contentInstance = new contentRef()
            await contentInstance.mount({
                anchor: 'modalContent',
                dialogRef: this,
                data
            })
        }
    }
}
