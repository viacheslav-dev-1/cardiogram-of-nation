import { v4 } from 'uuid'

export class Figure {
    #name
    #figure
    #canvas
    #id

    constructor(name) {
        this.#name = name
        this.#figure = document.createElementNS('http://www.w3.org/2000/svg', name)
    }

    draw(style, canvas, append, options) {
        this.#id = style && style.id ? style.id : v4()
        this.#figure.setAttribute('id', this.#id)
        const figures = options && options.figures !== undefined ? options.figures : null
        const points = options && options.points !== undefined ? options.points : null
        const text = options && options.text !== undefined ? options.text : null

        if (this.#name === 'g') {
            if (figures === null || figures.length === 0) {
                console.error('Group must contain at least on child')
                return
            }

            figures.forEach(f => f && this.#figure.appendChild(f.figure))
        }
        else if (this.#name === 'polygon') {
            if (points === null || canvas === null || points.length === 0) {
                console.error('Polygon must not be null or pointless')
                return
            }

            points.forEach(value => {
                const point = canvas.createSVGPoint()
                point.x = value[0]
                point.y = value[1]
                this.#figure.points.appendItem(point)
            })
        }
        else if (this.#name === 'text' || this.#name === 'title') {
            if (text === null) {
                console.error('Text must contain text content and cannot be null')
                return
            }

            this.#figure.textContent = text
        }

        style && Object.entries(style).forEach(entry => {
            if (!!entry[0] && !/^\s*$/.test(entry[0])) {
                const key = this.#name === 'marker'
                    ? entry[0]
                    : entry[0].replace(/[A-Z]/g, m => "-" + m.toLowerCase())
                this.#figure.setAttribute(key, entry[1])
            }
        })

        append && canvas.appendChild(this.#figure)
        this.#canvas = canvas
        return this
    }

    appendText(style, text, append) {
        const textFigure = new Figure('text').draw(style.text, this.#canvas, false, { text })
        const group = new Figure('g').draw(style.group, this.#canvas, append, { figures: [this, textFigure] })
        return group
    }

    appendFigure(figure) {
        this.figure.appendChild(figure.figure)
        return this
    }

    use(style, canvas) {
        return new Figure('use').draw({ 'href': `#${this.#id}`, ...style }, canvas, true)
    }

    get figure() {
        return this.#figure
    }
}
