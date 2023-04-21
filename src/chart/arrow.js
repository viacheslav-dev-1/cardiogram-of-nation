import { Figure } from "./figure";
import { v4 } from 'uuid'

export class Arrow extends Figure {
    draw(vector, size, padding, style, canvas) {
        const id = v4()
        const width = size / 2
        const marker = new Figure('marker').draw({
            id,
            viewBox: `0 0 ${size} ${size}`,
            refX: 0,
            refY: 5,
            markerUnits: 'strokeWidth',
            markerWidth: width,
            markerHeight: width,
            orient: 'auto'
        })

        const path = new Figure('path').draw({
            d: 'M 0 0 L 10 5 L 0 10 Z',
            fill: style.fill
        })

        marker.appendFigure(path)

        const koef = vector[0][1] < vector[1][1] ? size + padding : -padding - size;
        const line = new Figure('line').draw({
            x1: vector[0][0],
            y1: vector[0][1],
            x2: vector[1][0],
            y2: vector[1][1] - koef,
            stroke: style.fill,
            strokeWidth: style.strokeWidth ? style.strokeWidth : 2,
            class: style.class ? style.class : '',
            strokeDasharray: style.strokeDasharray ? style.strokeDasharray : 3,
            markerEnd: `url(#${id})`
        })

        canvas.appendChild(marker.figure)
        canvas.appendChild(line.figure)

        return line
    }
}
