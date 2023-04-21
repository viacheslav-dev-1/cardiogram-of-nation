import Component from '../component'
import template from './loader.html'

export default class LoaderComponent extends Component {
    async mount(anchor) {
        await super.mount({
            anchor,
            template
        })
    }
}
