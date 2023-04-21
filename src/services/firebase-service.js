import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

export default class FirebaseService {
    #ref = undefined
    #db = undefined
    static #instance = undefined

    constructor() {
        this.#db = getFirestore()
        this.#ref = collection(this.#db, 'events-json') // Temporarily
    }

    static initialize() {
        if (!this.#instance) {
            const firebaseConfig = {
                apiKey: "AIzaSyBmU7Vyg6DsA58iyBni7AxIToGRnsG6CoE",
                authDomain: "cardiogram-of-nation.firebaseapp.com",
                projectId: "cardiogram-of-nation",
                storageBucket: "cardiogram-of-nation.appspot.com",
                messagingSenderId: "663120394376",
                appId: "1:663120394376:web:e1097071184ff78ee4073d"
            };

            initializeApp(firebaseConfig)
            this.#instance = new FirebaseService()
        }

        return this.#instance
    }

    async get() {
        try {
            const snap = await getDocs(this.#ref)
            let docs = []
            snap.docs.forEach(doc => {
                const data = JSON.parse(doc.data()?.data)
                docs = data // Temporarily
            })

            return docs
        }
        catch (e) {
            console.error(e)
            return null
        }
    }
}
