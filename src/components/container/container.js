import ActionPanel from '../action-panel/action-panel'
import Component from '../component'
import HeaderComponent from '../header/header'

export default class Container extends Component {
    async mount({ warDay, isMobile, isHorizontal }) {
        await super.mount({
            anchor: 'body',
            template: import('./container.html')
        })

        if (isMobile) {
            this.find('.bottom-action-panel').style.display = 'none'
        }

        if (isHorizontal || !isMobile) {
            this.find('.top-action-panel').style.display = 'none'
        }

        this.find('#container').style.display = 'flex'

        await new HeaderComponent().mount({ warDay, isMobile })
        await new ActionPanel().mount({ isMobile })
    }
}
