import template from './container.html'

export class Container {
    static inject(isMobile) {
        document.body.innerHTML = template
        document.getElementsByClassName(isMobile ? 'bottom-action-panel' : 'top-action-panel')[0].style.display = 'none'

        return document.getElementById('container')
    }
}
