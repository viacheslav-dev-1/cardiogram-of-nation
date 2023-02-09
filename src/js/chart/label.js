import { Figure } from "./figure";

export class Label extends Figure {
    draw(x, y, height, style, index, text, canvas) {
        const padding = 22
        const points = [
            [x - padding, padding + y],
            [x, y],
            [x + padding, padding + y],

            [x + padding, height + y],
            [x, height - padding + y],
            [x - padding, height + y]
        ]

        const polygon = new Figure('polygon').draw({
            fill: style.stroke ? 'white' : style.fill,
            class: 'svg-polygon',
            id: 'svg-polygon_' + index,
            dataTooltip: text,
            opacity: style.stroke ? '1' : '0.7',
            stroke: style.stroke ? style.stroke : null,
            strokeWidth: style.stroke ? 3 : 0
        }, canvas, false, { points })

        const titleEl = new Figure('title').draw({}, canvas, false, { text: text + (style.stroke ? ' - Zero Point' : '') })
        polygon.appendFigure(titleEl)

        const symbHeight = 12
        const tx = x - 1.5
        const ty = y + height / 2
        const title = text
        const splitted = text.split(/\s/g)
        const figures = [polygon]
        const textColor = style.stroke ? style.stroke : style.textColor

        if (Math.floor(height - padding) <= text.length * symbHeight && splitted.length === 2) {
            const textSize = this.#getTextSize(height, padding, splitted[0], symbHeight)
            const newText = this.#getTextForLabel(splitted[0], tx - 10, ty, textColor, textSize, title, index, style.stroke && 'black 0px 0px 3px')
            const textSize2 = this.#getTextSize(height, padding, splitted[1], symbHeight);
            const newText2 = this.#getTextForLabel(splitted[1], tx + 10, ty, textColor, textSize2, title, index, style.stroke && 'black 0px 0px 3px')
            newText.appendFigure(titleEl)
            newText2.appendFigure(titleEl)
            figures.push(newText, newText2)
        } else {
            let textSize = this.#getTextSize(height, padding, text, symbHeight)
            const data = this.#scaleText(textSize, text, height, padding, symbHeight)
            text = data.text
            textSize = data.textSize
            const newText = this.#getTextForLabel(text, tx, ty, textColor, textSize, title, index)
            newText.appendFigure(titleEl)
            figures.push(newText)
        }

        return new Figure('g').draw({ cursor: 'pointer' }, canvas, true, { figures })
    }

    #getTextSize(height, padding, text, symbHeight) {
        const textRatio = Math.floor(height - padding) / (text.length * symbHeight);
        return textRatio > 1 ? 1 : textRatio - 0.1;
    }

    #scaleText(textSize, text, height, padding, symbHeight) {
        if (textSize < 0.5) {
            let newText = text;

            while (Math.floor(height - padding) / (newText.length * symbHeight) < 0.8) {
                newText = newText.substring(0, newText.length - 1);
            }

            text = newText + '...';
            textSize = 0.5;
        }

        return { textSize, text }
    }

    #getTextForLabel(text, tx, ty, textColor, textSize, title, index) {
        const newText = new Figure('text').draw({
            x: tx + 1, y: ty + 2, fill: textColor, textAnchor: 'middle', alignmentBaseline: 'middle',
            transform: `rotate(270, ${tx}, ${ty})`, outline: 'none', fontSize: textSize + 'em', id: 'svg-polygon-text_' + index, dataTooltip: title
        },
            {}, false, { text })
        return newText;
    }
}