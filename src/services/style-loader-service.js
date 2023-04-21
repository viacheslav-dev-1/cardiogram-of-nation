import UtilsService from './utils-service'
import '../components/details-modal/content-part/content-part.scss'

export default class StyleLoaderService {
    static async load() {
        await import('../components/loader/loader.scss')
        await import('../components/container/container.scss')
        await import('../components/header/header.scss')

        UtilsService.isMobile
            ? await import('../components/header/header-mobile.scss')
            : await import('../components/header/header-desktop.scss')

        await import('../components/action-panel/action-panel.scss')

        await import('../components/modal/modal.scss')
        UtilsService.isMobile && await import('../components/modal/modal-mobile.scss')

        await import('../components/details-modal/content-part/content-part.scss')
        UtilsService.isMobile && await import('../components/details-modal/content-part/content-part-mobile.scss')

        await import('../components/menu-modal/parts/content-part/content-part.scss')

        await import('../components/menu-modal/parts/info-part/info-part.scss')

        await import('../components/menu-modal/parts/zero-part/zero-part.scss')
        UtilsService.isMobile && await import('../components/menu-modal/parts/zero-part/zero-part-mobile.scss')
    }
}