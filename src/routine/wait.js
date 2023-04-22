export default class Wait {
    static for(time = 0) {
        return new Promise((resolve, _) => setTimeout(resolve, time))
    }

    static func(func, time = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const result = func()
                    resolve(result)
                } catch (e) {
                    console.error(e)
                    reject(e)
                }
            }, time)
        })
    }

    static funcAsync(func, time = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const result = await func()
                    resolve(result)
                } catch (e) {
                    console.error(e)
                    reject(e)
                }
            }, time)
        })
    }
}
