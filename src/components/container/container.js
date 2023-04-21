import ActionPanel from '../action-panel/action-panel'
import Component from '../component'
import HeaderComponent from '../header/header'
import UtilsService from '../../services/utils-service'
import template from './container.html'

export default class Container extends Component {
    async mount(anchor) {
        await super.mount({
            anchor,
            template
        })

        const isMobile = UtilsService.isMobile
        const isHorizontal = UtilsService.isHorizontal

        if ( isMobile) {
            this.find('.bottom-action-panel').style.display = 'none'
        }

        if (isHorizontal || !isMobile) {
            this.find('.top-action-panel').style.display = 'none'
        }

        this.find('#container').style.display = 'flex'

        await new HeaderComponent().mount('header')
        await new ActionPanel().mount(UtilsService.isMobile ? 'ocontainerTop' : 'ocontainerBottom')
    }
}
