import Component from '../component'

export default class LoaderComponent extends Component {
    async mount() {
        await super.mount({
            anchor: 'loader',
            template: import('./loader.html')
        })
    }
}
