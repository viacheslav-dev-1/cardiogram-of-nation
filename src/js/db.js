import {getFirestore, collection, getDocs, doc, setDoc} from 'firebase/firestore'
export class Db {
    #ref
    #db
    
    constructor() {
        this.#db = getFirestore()
        this.#ref = collection(this.#db, 'events-json') // Temporarily
    }

    async get() {
        try
        {
            const snap = await getDocs(this.#ref)
            let docs = []
            snap.docs.forEach(doc => {
                const data = JSON.parse(doc.data()?.data)
                docs = data // Temporarily
            })
    
            return docs
        }
        catch(e) {
            console.error(e)
            return null
        }
    }

    async add(item, id) {
        const ref = doc(this.#db, 'events', id)
        await setDoc(ref, item)
    }
}
