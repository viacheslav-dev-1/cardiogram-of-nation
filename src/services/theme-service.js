import { applyTheme, initThemes } from "../components/theme/theme-manager"
import Ls from "./local-storage-service"

export default class ThemeService {
    static init() {
        initThemes({
            default: Ls.get('theme') ?? 'dark',
            dark: {
                '--main-background': 'black',
                '--main-text-color': 'rgb(201, 201, 201)',
                '--main-link-color': 'rgb(83, 177, 249)',
                '--modal-backgound-color': '#1f1f1f',
                '--modal-box-shadow': '#252525',
                '--modal-header-background-color': '#383838',
                '--modal-menu-item-hover': '#343434',
                '--slider-main': 'white',
                '--slider-second': 'rgb(175, 175, 175)',
                '--modal-mask': 'rgba(255, 255, 255, 0.831)',
                '--opt-active': '#4e4e4e',
                '--modal-menu-border': '#545454',
                '--yellow-color':'#fffb00',
                '--chart-spots-color': '#3e3e3e',
                '--chart-darker': 'black'
            },
            light: {
                '--main-background': 'rgb(247 247 247)',
                '--main-text-color': '#535353',
                '--main-link-color': 'rgb(43 106 154)',
                '--modal-backgound-color': '#dddddd',
                '--modal-box-shadow': '#646464',
                '--modal-header-background-color':' #c6c6c6',
                '--modal-menu-item-hover': '#b9b9b9',
                '--slider-main': 'white',
                '--slider-second': 'rgb(175, 175, 175)',
                '--modal-mask': 'rgb(30 30 30 / 83%)',
                '--opt-active': '#c3c3c3',
                '--modal-menu-border': '#a9a9a9',
                '--yellow-color': '#e4ba1f',
                '--chart-spots-color': '#c5c5c5',
                '--chart-darker': '#fff'
            }
        })
    }

    static apply(name) {
        applyTheme(name)
    }
}