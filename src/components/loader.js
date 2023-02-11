import template from './loader.html'

export class LoaderComponent {
    static #loader
    
    static inject() {
        this.#loader = document.getElementById('loader')
        this.#loader.innerHTML = template
    }

    static eject() {
        this.#loader.style.display = 'none'
        this.#loader.innerHTML = ''
    }
}
