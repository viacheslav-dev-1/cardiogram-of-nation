import { mut, subject } from 'tieder'
import { storeConfig } from '../config/store-config';

export default class UtilsService {
    static #clientWidth = undefined
    static #clientHeight = undefined

    static get warDay() {
        // const start = new Date("02/24/2022");
        // const now = new Date();
        // const timeDiff = now.getTime() - start.getTime()
        // return Math.floor(timeDiff / (1000 * 3600 * 24)) + 1
        return 731
    }

    static get isMobile() {
        if (this.#clientWidth === undefined)
            this.#clientWidth = document.documentElement.clientWidth
        if (this.#clientHeight === undefined)
            this.#clientHeight = document.documentElement.clientHeight
        return this.#clientWidth < 800 || this.#clientHeight < 800
    }

    static get isHorizontal() {
        return this.#clientHeight < 600
    }

    static get isIOS() {
        return navigator.userAgent.includes('iPhone') ||
            navigator.userAgent.includes('iPad') ||
            navigator.userAgent.includes('iPod')
    }

    static date(date) {
        return new Date(date).toLocaleString().split(',')[0]
    }

    static resize() {
        const { mob, hor } = subject(storeConfig.prevClientSize)?.cur
        const { innerWidth, innerHeight } = window

        if ((mob === 'm' && !(innerWidth < 800 && innerHeight < 800)) ||
            (mob === 'd' && innerWidth < 800 && innerHeight < 800) ||
            (hor === 'v' && innerHeight < 600 || (hor === 'h' && !(innerHeight < 600)))) {
            location.reload()
        }
    }

    static setPrevSize() {
        mut(storeConfig.prevClientSize, {
            mob: window.innerWidth < 800 && window.innerHeight < 800 ? 'm' : 'd',
            hor: window.innerHeight < 600 ? 'h' : 'v'
        })
    }
}
