import './styles.scss'
import './components/loader/loader.scss'
import './components/container/container.scss'
import './components/header/header.scss'
import './components/action-panel/action-panel.scss'
import './components/modal/modal.scss'
import './components/details-modal/content-part/content-part.scss'
import './components/menu-modal/parts/content-part/content-part.scss'
import './components/menu-modal/parts/info-part/info-part.scss'
import './components/menu-modal/parts/zero-part/zero-part.scss'
import './components/menu-modal/parts/video-part/video-part.scss'
import './images/favicon.png'

import UtilsService from './services/utils-service'
import StyleLoaderService from './services/style-loader-service'
import StarterService from './services/starter-service'
import On from './event-handler/on'

(() => {
    On.resize(UtilsService.resize)
    StyleLoaderService.load().then(StarterService.start)
})()
