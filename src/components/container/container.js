import ActionPanel from '../action-panel/action-panel'
import Component from '../component'
import HeaderComponent from '../header/header'
import UtilsService from '../../services/utils-service'
import Factory from '../component-factory'
import template from './container.html'
import LoaderComponent from '../loader/loader'

export default class Container extends Component {
    #loader = undefined
    
    mount({anchor}) {
        super.mount({
            anchor,
            template
        })

        const isMobile = UtilsService.isMobile
        const isHorizontal = UtilsService.isHorizontal

        if (isMobile) {
            this.find('.bottom-action-panel').style.display = 'none'
        }

        if (isHorizontal || !isMobile) {
            this.find('.top-action-panel').style.display = 'none'
        }

        this.find('#container').style.display = 'flex'

        this.#loader = Factory.mount(LoaderComponent)
        
        Factory.mount(HeaderComponent)

        if (UtilsService.isMobile) Factory.mount(ActionPanel, { anchor: 'ActionPanelTop' })
        else Factory.mount(ActionPanel)
    }

    get loader() {
        return this.#loader
    }
}