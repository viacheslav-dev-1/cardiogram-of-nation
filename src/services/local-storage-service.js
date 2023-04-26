export default class Ls {
    static set(obj) {
        if (!obj) {
            console.error('Object can not be null or undefined')
            return
        }

        Object.entries(obj).forEach(value => {
            let val = value[1]
            if (typeof value[1] == 'boolean') {
                val = 'bool:' + (value[1] === true ? 1 : 0);
            }
            localStorage.setItem(value[0], val)
        })
    }

    static get(key) {
        let item = localStorage.getItem(key)
        if (item?.includes(':')) {
            const items = item.split(':')
            const classifier = items[0]
            const value = items[1]

            if (classifier === 'bool') {
                return value == 1 ? true : false
            }
        }
        return item
    }
}