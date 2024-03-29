import ZeroPart from './parts/zero-part/zero-part'
import InfoPart from './parts/info-part/info-part'
import VideoPart from './parts/video-part/video-part'

export const menuConfig = [
    {
        title: 'Стани Zero-Point',
        icon: '<svg viewBox="56.31 44.979 163.709 159.853" width="50" height="40"><g transform="matrix(1, 0, 0, 1, -100.537331, -213.257431)"><g transform="matrix(1, 0, 0, 1, 55.643364, 182.485687)"><rect x="117.586" y="123.015" width="97.046" height="95.472" style="fill:#ff5f5f;paint-order:fill;stroke-width:4px;stroke:#fff" transform="matrix(0.707107, 0.707107, -0.707107, 0.707107, 200.129944, -70.658096)" rx="8.317" ry="8.317"></rect><rect x="110.641" y="115.75" width="91.314" height="89.833" style="stroke-width:4px;paint-order:fill;stroke:#000;fill:rgba(255,255,255,0)" transform="matrix(0.707107, 0.707107, -0.707107, 0.707107, 199.875809, -57.239246)" rx="8.317" ry="8.317"></rect><rect x="85.935" y="92.295" width="70.924" height="71.629" style="paint-order:fill;stroke:#000;fill:rgba(255,255,255,0);stroke-width:2px" transform="matrix(0.707107, 0.707107, -0.707107, 0.707107, 201.813126, -9.825445)" rx="2.43" ry="2.43"></rect><g fill="#a87474" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal" transform="matrix(1, 0, 0, 1, 217.298096, 43.401974)"><g transform="scale(8,8)"><path d="M -4.339 12.704 C -4.506 12.704 -4.642 12.84 -4.642 13.008 C -4.642 13.055 -4.63 13.101 -4.611 13.141 C -4.65 13.122 -4.696 13.109 -4.743 13.109 C -4.911 13.109 -5.047 13.245 -5.047 13.413 C -5.047 13.58 -4.911 13.716 -4.743 13.716 C -4.628 13.716 -4.529 13.653 -4.478 13.558 L -3.927 14.115 C -4.07 14.325 -4.169 14.57 -4.212 14.83 C -4.278 15.233 -4.2 15.613 -4.035 15.943 L -4.035 16.145 C -4.035 16.289 -3.981 16.42 -3.896 16.525 L -4.478 17.107 C -4.53 17.015 -4.63 16.955 -4.743 16.955 C -4.911 16.955 -5.047 17.091 -5.047 17.259 C -5.047 17.426 -4.911 17.562 -4.743 17.562 C -4.696 17.562 -4.65 17.55 -4.611 17.531 C -4.63 17.57 -4.642 17.616 -4.642 17.663 C -4.642 17.831 -4.506 17.967 -4.339 17.967 C -4.171 17.967 -4.035 17.831 -4.035 17.663 C -4.035 17.55 -4.095 17.45 -4.187 17.398 L -3.529 16.74 C -3.496 16.745 -3.463 16.753 -3.428 16.753 C -3.428 17.085 -3.153 17.36 -2.82 17.36 L -2.011 17.36 C -1.678 17.36 -1.404 17.085 -1.404 16.753 C -1.369 16.753 -1.336 16.745 -1.302 16.74 L -0.645 17.398 C -0.736 17.45 -0.796 17.55 -0.796 17.663 C -0.796 17.831 -0.66 17.967 -0.493 17.967 C -0.325 17.967 -0.189 17.831 -0.189 17.663 C -0.189 17.616 -0.202 17.57 -0.221 17.531 C -0.181 17.55 -0.135 17.562 -0.088 17.562 C 0.08 17.562 0.216 17.426 0.216 17.259 C 0.216 17.091 0.08 16.955 -0.088 16.955 C -0.201 16.955 -0.301 17.015 -0.354 17.107 L -0.936 16.525 C -0.85 16.42 -0.796 16.289 -0.796 16.145 L -0.796 15.949 C -0.671 15.703 -0.594 15.428 -0.594 15.133 C -0.594 14.756 -0.712 14.406 -0.91 14.115 L -0.354 13.558 C -0.302 13.653 -0.203 13.716 -0.088 13.716 C 0.08 13.716 0.216 13.58 0.216 13.413 C 0.216 13.245 0.08 13.109 -0.088 13.109 C -0.135 13.109 -0.181 13.122 -0.221 13.141 C -0.202 13.101 -0.189 13.055 -0.189 13.008 C -0.189 12.84 -0.325 12.704 -0.493 12.704 C -0.66 12.704 -0.796 12.84 -0.796 13.008 C -0.796 13.123 -0.733 13.222 -0.638 13.274 L -1.176 13.805 C -1.505 13.498 -1.946 13.309 -2.428 13.312 C -2.496 13.312 -2.562 13.316 -2.631 13.324 C -3.024 13.369 -3.384 13.539 -3.662 13.799 L -4.193 13.274 C -4.098 13.222 -4.035 13.123 -4.035 13.008 C -4.035 12.84 -4.171 12.704 -4.339 12.704 Z M -2.422 13.716 C -1.632 13.712 -0.999 14.346 -0.999 15.133 C -0.999 15.382 -1.063 15.613 -1.176 15.816 L -1.201 15.867 L -1.201 16.145 C -1.201 16.26 -1.289 16.348 -1.404 16.348 L -1.808 16.348 L -1.808 16.753 C -1.808 16.867 -1.896 16.955 -2.011 16.955 L -2.82 16.955 C -2.935 16.955 -3.023 16.867 -3.023 16.753 L -3.023 16.348 L -3.428 16.348 C -3.542 16.348 -3.63 16.26 -3.63 16.145 L -3.63 15.867 L -3.655 15.816 C -3.803 15.549 -3.87 15.233 -3.814 14.893 C -3.714 14.282 -3.195 13.799 -2.58 13.729 C -2.526 13.723 -2.475 13.716 -2.422 13.716 Z M -3.023 15.133 C -3.247 15.133 -3.428 15.314 -3.428 15.538 C -3.428 15.762 -3.247 15.943 -3.023 15.943 C -2.799 15.943 -2.618 15.762 -2.618 15.538 C -2.618 15.314 -2.799 15.133 -3.023 15.133 Z M -1.808 15.133 C -2.032 15.133 -2.213 15.314 -2.213 15.538 C -2.213 15.762 -2.032 15.943 -1.808 15.943 C -1.585 15.943 -1.404 15.762 -1.404 15.538 C -1.404 15.314 -1.585 15.133 -1.808 15.133 Z M -2.618 16.145 L -2.618 16.55 L -2.213 16.55 L -2.213 16.145 L -2.618 16.145 Z" style="fill:#000"></path></g></g></g><rect x="6.49" y="388.036" width="2.964" height="111.064" style="stroke:#000;fill:#fff;stroke-width:0" transform="matrix(0.69397, 0.720004, -0.720004, 0.69397, 524.512207, -2.976567)"></rect><text style="fill:var(--main-text-color);font-family:Arial,sans-serif;font-size:14.9px;white-space:pre" transform="matrix(0.729091, -0.684417, 0.684417, 0.729091, -143.565414, 230.779587)"><tspan x="148.679" y="294.089" style="font-size:14.9px;word-spacing:0">ZERO - POINTS</tspan></text></g></svg>',
        component: ZeroPart,
        classList: 'zero-icon'
    },
    {
        title: 'Інформація',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38" height="38" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11.045 -8.955,20 -20,20c-11.045,0 -20,-8.955 -20,-20c0,-11.045 8.955,-20 20,-20c11.045,0 20,8.955 20,20z" fill="#2196f3"></path><path d="M22,22h4v11h-4zM26.5,16.5c0,1.379 -1.121,2.5 -2.5,2.5c-1.379,0 -2.5,-1.121 -2.5,-2.5c0,-1.379 1.121,-2.5 2.5,-2.5c1.379,0 2.5,1.121 2.5,2.5z" fill="#ffffff"></path></g></g></svg>',
        component: InfoPart
    },
    {
        subtitle: true,
        title: 'Спецвипуски'
    },
    {
        title: 'Як працюють складні ІПсО на конкретні цільові аудиторії',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38px" height="38px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11 -9,20 -20,20c-11,0 -20,-9 -20,-20c0,-11 9,-20 20,-20c11,0 20,9 20,20z" fill="#fc8b95"></path><path d="M17,33v-18l17.9,9h0.1z" fill="#ffffff"></path></g></g></svg>',
        component: VideoPart,
        extras: {
            date: '24 лют. 2023 р.',
            description: 'Впродовж місяця ми дуже поглиблено вивчали ІПсО. Слід зазначити, що ворог змінив підхід. Зараз часто ІПсО відбуваються зі складним нашаруванням. Що це значить та як працює - розбираю.',
            src: 'https://www.youtube.com/embed/vysz3M0WdUM'
        }
    },
    {
        title: 'Інструкція і класифікація зрадо**бів',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38px" height="38px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11 -9,20 -20,20c-11,0 -20,-9 -20,-20c0,-11 9,-20 20,-20c11,0 20,9 20,20z" fill="#fc8b95"></path><path d="M17,33v-18l17.9,9h0.1z" fill="#ffffff"></path></g></g></svg>',
        component: VideoPart,
        extras: {
            date: '2 лют. 2023 р.',
            description: 'Зрадо**б - це філософія. Це одвічна школа життя. Це як храм Шаолінь. Тільки ху***ий. Шо ж, якшо ви починаючий зрадо**б - це відео для вас. Як правильно ї**ть зраду шоб не зійти зі шляху зрадо**ба. Чим вони відрізняються і які їх види.',
            src: 'https://www.youtube.com/embed/yTKnVF5bOPQ'
        }
    },
    {
        title: 'Рівні гніву людей',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38px" height="38px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11 -9,20 -20,20c-11,0 -20,-9 -20,-20c0,-11 9,-20 20,-20c11,0 20,9 20,20z" fill="#fc8b95"></path><path d="M17,33v-18l17.9,9h0.1z" fill="#ffffff"></path></g></g></svg>',
        component: VideoPart,
        extras: {
            date: '30 вер. 2022 р.',
            description: 'Іноді мені здається, що ці стани, які ми аналізуємо, не сприймаються серйозно і для когось це просто слова. Але всі ці назви станів мають дійсно психологічну (а іноді і медичну) класифікацію. Гнів має 4 різних рівні. І сьогодні Українці відчувають четвертий рівень.',
            src: 'https://www.youtube.com/embed/b6O68b1ms34'
        }
    },
    {
        title: 'Пташки смерті для окупанта',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38px" height="38px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11 -9,20 -20,20c-11,0 -20,-9 -20,-20c0,-11 9,-20 20,-20c11,0 20,9 20,20z" fill="#fc8b95"></path><path d="M17,33v-18l17.9,9h0.1z" fill="#ffffff"></path></g></g></svg>',
        component: VideoPart,
        extras: {
            date: '18 трав. 2022 р.',
            description: 'Як літають? Шо роблять? В чому цінність і небезпека? Про дрони у цій війні вже багато сказали, зняли, розповіли. Але такого контенту багато не буває.',
            src: 'https://www.youtube.com/embed/vw69JmBSN0E'
        }
    },
    {
        title: 'Lend lease',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38px" height="38px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11 -9,20 -20,20c-11,0 -20,-9 -20,-20c0,-11 9,-20 20,-20c11,0 20,9 20,20z" fill="#fc8b95"></path><path d="M17,33v-18l17.9,9h0.1z" fill="#ffffff"></path></g></g></svg>',
        component: VideoPart,
        extras: {
            date: '10 трав. 2022 р.',
            description: 'Що таке ленд-ліз? Чому на ньому спекулюють і залякують? На які точки давлять ІПсО, щоб дестабілізувати українців?',
            src: 'https://www.youtube.com/embed/En82-TB_d-s'
        }
    },
    {
        title: 'Що таке Моссад і чи треба щось подібне в Україні?',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38px" height="38px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11 -9,20 -20,20c-11,0 -20,-9 -20,-20c0,-11 9,-20 20,-20c11,0 20,9 20,20z" fill="#fc8b95"></path><path d="M17,33v-18l17.9,9h0.1z" fill="#ffffff"></path></g></g></svg>',
        component: VideoPart,
        extras: {
            date: '13 квіт. 2022 р.',
            description: 'Після звірств рускєх терористів-безбожників в Бучі і інших містах України багато хто почав говорити, що нам треба свій Моссад. Я впевнений, що більшість не цікавилися історією цієї структури. Тому підготував для вас спецвипуск.',
            src: 'https://www.youtube.com/embed/UQgWVbwxjYg'
        }
    },
    {
        title: 'ІПсО. Деукраїнізація. Як воює ворог? Ч.2',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38px" height="38px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11 -9,20 -20,20c-11,0 -20,-9 -20,-20c0,-11 9,-20 20,-20c11,0 20,9 20,20z" fill="#fc8b95"></path><path d="M17,33v-18l17.9,9h0.1z" fill="#ffffff"></path></g></g></svg>',
        component: VideoPart,
        extras: {
            date: '3 квіт. 2022 р.',
            description: 'Спецвипуск про Інформаційно-психологічні операції проти нас. Частина 2. Риторику ворога змінено на «деукраїнізацію». Це ніщо інакше, як фашизм і нацизм. Проти України йде велика і довгострокова дезінформаційна операція. Що це таке і з чого складається?',
            src: 'https://www.youtube.com/embed/HCiXjjY-OvA'
        }
    },
    {
        title: 'Що таке ІПсО і як проти нас воює ворог? Ч.1',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38px" height="38px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11 -9,20 -20,20c-11,0 -20,-9 -20,-20c0,-11 9,-20 20,-20c11,0 20,9 20,20z" fill="#fc8b95"></path><path d="M17,33v-18l17.9,9h0.1z" fill="#ffffff"></path></g></g></svg>',
        component: VideoPart,
        extras: {
            date: '3 квіт. 2022 р.',
            description: 'Спецвипуск про Інформаційно-психологічні операції проти нас. Частина 1. Найпоширеніші методи впливу на українців окупантом. Головне - якщо ви знаєте хоча б поверхнево про ІПсО - на вас вже складніше вплинути.',
            src: 'https://www.youtube.com/embed/HqF6S1IIW4s'
        }
    },
    {
        title: 'Хімічна зброя. Дія і інструкції.',
        icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38px" height="38px" viewBox="0,0,256,256"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(5.33333,5.33333)"><path d="M44,24c0,11 -9,20 -20,20c-11,0 -20,-9 -20,-20c0,-11 9,-20 20,-20c11,0 20,9 20,20z" fill="#fc8b95"></path><path d="M17,33v-18l17.9,9h0.1z" fill="#ffffff"></path></g></g></svg>',
        component: VideoPart,
        extras: {
            date: '27 бер. 2022 р.',
            description: 'УТОЧНЕННЯ:<br> Аміак - легший за повітря ⬆️ <br> Хлор - важчий ⬇️',
            src: 'https://www.youtube.com/embed/EpF-wCTfPcU'
        }
    }
]
