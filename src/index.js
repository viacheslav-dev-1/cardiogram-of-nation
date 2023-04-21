import './styles.scss'
import './images/favicon.png'
import UtilsService from './services/utils-service';
import StyleLoaderService from './services/style-loader-service';
import StarterService from './services/starter-service';

(() => {
    window.addEventListener('resize', () => UtilsService.resize())
    StyleLoaderService.load().then(StarterService.start)
})()
