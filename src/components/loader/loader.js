import Component from '../component'
import './loader.scss'

export default class LoaderComponent extends Component {
    async mount() {
        await super.mount({
            anchor: 'loader',
            template: import('./loader.html')
        })
    }
}
