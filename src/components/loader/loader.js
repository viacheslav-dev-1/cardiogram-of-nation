import Component from '../component'
import template from './loader.html'

export default class LoaderComponent extends Component {
    mount({anchor}) {
        super.mount({
            anchor,
            template
        })
    }
}
