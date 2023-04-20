import Component from "../component";
import './modal.scss'

export default class ModalComponent extends Component {
    async mount({ isMobile, modalData }) {
        isMobile && import('./modal-mobile.scss')
        await super.mount({
            anchor: 'modalMask',
            template: import('./modal.html'),
            display: 'inherit'
        })
        const { titleTemplate, contentRef, data, onClose } = modalData
        const modalTitle = this.find('#modalTitle')

        if (titleTemplate) {
            const titleHtml = titleTemplate.then ? (await titleTemplate).default : titleTemplate
            modalTitle.innerHTML = titleHtml
        }

        if (contentRef) {
            await this.#createContentInstance(contentRef, isMobile, data)
            const backBtn = this.find('#backBtn').querySelector('svg')
            backBtn.addEventListener('click', async () => {
                backBtn.style.display = 'none'
                modalTitle.innerHTML = (await titleTemplate).default
                await this.#createContentInstance(contentRef, isMobile, data)
            })
        }

        this.find('#closeModalBtn').addEventListener('click', () => {
            this.unmount()
            onClose && onClose()
        })
    }

    async #createContentInstance(contentRef, isMobile, data) {
        if (contentRef) {
            const contentInstance = new contentRef()
            await contentInstance.mount({
                anchor: 'modalContent',
                dialogRef: this,
                isMobile,
                data
            })
        }
    }
}
