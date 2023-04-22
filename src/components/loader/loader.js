import Component from '../component'
import template from './loader.html'

export default class LoaderComponent extends Component {
    defaultAnchor = 'LoaderComponent'
    
    mount({anchor}) {
        super.mount({
            anchor,
            template
        })
    }
}
