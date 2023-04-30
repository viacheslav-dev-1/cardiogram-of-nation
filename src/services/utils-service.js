import { mut, sub, subject } from 'a-simple-store/src/index'

export default class UtilsService {
    static #clientWidth = undefined
    static #clientHeight = undefined

    static get warDay() {
        const start = new Date("02/24/2022");
        const now = new Date();
        const timeDiff = now.getTime() - start.getTime()
        return Math.floor(timeDiff / (1000 * 3600 * 24)) + 1
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
        const prevMob = subject('prevMob')?.cur
        const prevHor = subject('prevHor')?.cur
        const { innerWidth, innerHeight } = window

        if ((prevMob === 'm' && !(innerWidth < 800 && innerHeight < 800)) ||
            (prevMob === 'd' && innerWidth < 800 && innerHeight < 800) ||
            (prevHor === 'v' && innerHeight < 600 || (prevHor === 'h' && !(innerHeight < 600)))) {
            location.reload()
        }
    }

    static setPrevSize() {
        mut('prevMob', window.innerWidth < 800 && window.innerHeight < 800 ? 'm' : 'd')
        mut('prevHor', window.innerHeight < 600 ? 'h' : 'v')
    }
}
