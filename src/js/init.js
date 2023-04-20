import { initializeApp } from 'firebase/app'
import { Store } from './store/store2';

export class Init {
    static clientWidth
    static clientHeight

    static get warDay() {
        const start = new Date("02/24/2022");
        const now = new Date();
        const timeDiff = now.getTime() - start.getTime()
        return Math.floor(timeDiff / (1000 * 3600 * 24)) + 1
    }

    static get isMobile() {
        if (this.clientWidth === undefined)
            this.clientWidth = document.documentElement.clientWidth
        if (this.clientHeight === undefined)
            this.clientHeight = document.documentElement.clientHeight
        return this.clientWidth < 800 || this.clientHeight < 800
    }

    static get isHorizontal() {
        return this.clientHeight < 600
    }

    static get isIOS() {
        return navigator.userAgent.includes('iPhone') ||
            navigator.userAgent.includes('iPad') ||
            navigator.userAgent.includes('iPod')
    }

    static firebase() {
        const firebaseConfig = {
            apiKey: "AIzaSyBmU7Vyg6DsA58iyBni7AxIToGRnsG6CoE",
            authDomain: "cardiogram-of-nation.firebaseapp.com",
            projectId: "cardiogram-of-nation",
            storageBucket: "cardiogram-of-nation.appspot.com",
            messagingSenderId: "663120394376",
            appId: "1:663120394376:web:e1097071184ff78ee4073d"
        };

        initializeApp(firebaseConfig)
    }

    static store() {
        Store.init()
    }

    static date(date) {
        return new Date(date).toLocaleString().split(',')[0]
    }
}
