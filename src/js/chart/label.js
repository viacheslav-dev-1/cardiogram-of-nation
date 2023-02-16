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
            id: 'svg-polygon_' + index,
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

        if (Math.floor(height - padding) <= text.length * symbHeight) {
            const firstGroup = []
            const lastGroup = []
            const fN = Math.round(splitted.length / 2)
            const lN = splitted.length - fN;

            let i = 0;
            for(i = 0; i < fN; i++) {
                firstGroup.push(splitted[i])
            }

            for(; i < lN + fN; i++) {
                lastGroup.push(splitted[i])
            }
            
            const firstText = firstGroup.join(' ')
            const lastText = lastGroup.join(' ')

            const textSize = this.#getTextSize(height, padding, firstText, symbHeight)
            const newText = this.#getTextForLabel(firstText, lastGroup.length > 0 ? tx - 10 : tx, ty, textColor, textSize, title, index, style.stroke && 'black 0px 0px 3px')
            newText.appendFigure(titleEl)
            figures.push(newText)

            if (lastGroup.length > 0) {
                const textSize2 = this.#getTextSize(height, padding, lastText, symbHeight);
                const newText2 = this.#getTextForLabel(lastText, tx + 10, ty, textColor, textSize2, title, index, style.stroke && 'black 0px 0px 3px')
                newText2.appendFigure(titleEl)
                figures.push(newText2)
            }
        } else {
            let textSize = this.#getTextSize(height, padding, text, symbHeight)
            const data = this.#scaleText(textSize, text, height, padding, symbHeight)
            text = data.text
            textSize = data.textSize
            const newText = this.#getTextForLabel(text, tx, ty, textColor, textSize, title, index)
            newText.appendFigure(titleEl)
            figures.push(newText)
        }

        return new Figure('g').draw({class: 'svg-polygon'}, canvas, true, { figures })
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