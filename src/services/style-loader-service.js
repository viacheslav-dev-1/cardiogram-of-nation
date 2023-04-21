import UtilsService from './utils-service'

export default class StyleLoaderService {
    static async load() {
        if (UtilsService.isMobile) {
            await import('../components/header/header-mobile.scss')
            await import('../components/modal/modal-mobile.scss')
            await import('../components/details-modal/content-part/content-part-mobile.scss')
            await import('../components/menu-modal/parts/zero-part/zero-part-mobile.scss')
        } else {
            await import('../components/header/header-desktop.scss')
        }
    }
}