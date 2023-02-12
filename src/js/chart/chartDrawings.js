import { Init } from "../init"
import { Store } from "../store/store2"
import { Arrow } from "./arrow"
import { Figure } from "./figure"
import { Label } from "./label"

export class ChartDrawings {
    #columns
    #rows

    #chartContainer
    #canvasContainer
    #chartSvg
    #legendSvg
    #legendWidth
    #legendHeight


    constructor(chartId, columns, rows) {
        this.#chartContainer = document.getElementById(chartId ? chartId : 'chart')
        if (!this.#chartContainer) {
            console.error('There is not container specified for chart. Please provide a valid one')
            return
        }

        const canvasContainer = document.createElement('div')
        canvasContainer.style.display = 'flex'
        canvasContainer.style.flexDirection = 'column'
        canvasContainer.style.overflowY = 'hidden'
        canvasContainer.style.overflowX = 'scroll'
        canvasContainer.style.height = '100%'
        canvasContainer.className = 'canvas-container'
        this.#canvasContainer = canvasContainer

        const chartSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        chartSvg.id = 'chart-canvas'
        this.#chartSvg = chartSvg

        this.#drawLegendCanvas()

        canvasContainer.appendChild(chartSvg)
        canvasContainer.appendChild(this.#legendSvg)
        this.#chartContainer.appendChild(canvasContainer)

        this.#columns = columns !== undefined ? columns : 0
        this.#rows = rows !== undefined ? rows : 0
    }

    draw(data, theme, chartHeight, legendHeight, options) {
        const { offsetWidth, offsetHeight } = this.#canvasContainer

        const chartSize = [offsetWidth, offsetHeight * (chartHeight ? chartHeight : Init.isMobile ? 0.5 : 0.4)]
        const legendSize = [offsetWidth, offsetHeight * (legendHeight ? legendHeight : (Init.isMobile ? (Init.isIOS ? 0.4 : 0.5) : 0.6))] // TODO: for Chrome and Safari on IOS reduce height
        this.#legendHeight = legendSize[1]

        this.#chartSvg.style.height = chartSize[1] + 'px'
        this.#legendSvg.style.height = legendSize[1] + 'px'

        const grid = this.#drawGrid(chartSize[1], theme, options)
        this.#drawChart(data, grid, theme, options)
    }

    #drawGrid(chartHeight, theme, options) {
        const circleLineGap = options && options.circleLineGap !== undefined ? options.circleLineGap : 10
        const left = options && options.left !== undefined ? options.left : 3
        const vgap = options && options.vgap !== undefined ? options.vgap : 65
        const hgap = options && options.hgap !== undefined ? options.hgap : 32.5
        let headerCircleR = options && options.headerCircleR !== undefined ? options.headerCircleR : 20
        let headerCirclePadding = headerCircleR
        const gridCircleR = options && options.gridCircleR !== undefined ? options.gridCircleR : 3
        const highlightLastColumn = options && options.highlightLastColumn !== undefined ? options.highlightLastColumn : true
        const scrollToEnd = options && options.scrollToEnd !== undefined ? options.scrollToEnd : true
        const dotGap = chartHeight / (this.#rows + 1.5) - left;
        const points = new Map()
        const gridCircle = new Figure('circle').draw({ r: gridCircleR }, this.#chartSvg, true)
        let endX = 0

        for (let i = 0, dX = left, x = left; i < this.#columns; i++, x += vgap) {
            const nX = x + hgap
            let fill = theme.dark
            let textColor = theme.bright

            if (highlightLastColumn && i === this.#columns - 1) {
                fill = textColor = theme.blue;
            }

            new Figure('text').draw({
                x: nX, y: headerCirclePadding + circleLineGap + 5, fill: textColor, outline: 'none',
                textAnchor: 'middle', class: 'svg-circle-text', cursor: 'pointer'
            }, this.#chartSvg, true, { text: (i + 1) + '' })

            for (let j = 0, y = vgap; j < this.#rows; j++, y += dotGap) {
                gridCircle.use({ x: nX, y: y + circleLineGap, fill }, this.#chartSvg)
                points.set(this.#point(i + 1, j + 1), [nX, y + circleLineGap])
            }

            dX += vgap

            i === this.#columns - 1 && (endX = dX)
        }

        this.#chartSvg.style.width = this.#legendSvg.style.width = this.#legendWidth = endX + left + 'px'
        scrollToEnd && (this.#canvasContainer.scrollLeft = endX + left)

        this.#canvasContainer.addEventListener("wheel", e => {
            e.preventDefault();
            this.#canvasContainer.scrollLeft += e.deltaY;
        });

        Store.sub('daysInput', (prev, cur) => {
            cur != '' && points && (this.#canvasContainer.scrollLeft = points.get(this.#point(cur, 1))[0] - 10)
        })

        return points
    }

    #drawChart(data, grid, theme, options) {
        const gridCircleR = options && options.gridCircleR !== undefined ? options.gridCircleR : 3
        const targetCircleR = gridCircleR !== null ? gridCircleR * 2 : 6
        const circle = new Figure('circle').draw({ r: targetCircleR, strokeWidth: 2 }, this.#chartSvg, true)

        for (let i = 0; i < this.#columns; i++) {
            const item = data[i]
            if (!item)
                continue

            const { line, cLine, sLine, cFeel, sFeel, eFeel } = item

            const curKey = this.#point(item.day, line)
            const cur = grid.get(curKey);

            // 151 Temporary stub
            if (data[i + 1] && i + 2 !== 151) {
                const nextKey = this.#point(item.day + 1, data[i + 1].line)
                const next = grid.get(nextKey);
                next && new Figure('line').draw({ x1: cur[0], y1: cur[1], x2: next[0], y2: next[1], strokeWidth: 2, stroke: theme.bright, class: 'grow-animation' },
                    this.#chartSvg, true)
            }

            if (cLine !== undefined && cLine !== line) {
                const target = grid.get((i + 1) + ';' + cLine)
                new Arrow().draw([cur, target], 10, gridCircleR, { fill: theme.blue, class: 'grow-animation' }, this.#chartSvg)
            }

            if (sLine !== undefined && sLine !== line) {
                const target = grid.get((i + 1) + ';' + sLine)
                new Arrow().draw([cur, target], 10, gridCircleR, { fill: theme.yellow, class: 'grow-animation' }, this.#chartSvg)
            }

            cur && circle.use({ x: cur[0], y: cur[1], fill: theme.darker, stroke: theme.bright, class: 'appear-animation' }, this.#chartSvg)

            if (!Init.isMobile) {
                const ly = this.#legendHeight / 3
                cur && cFeel !== undefined && new Label().draw(cur[0], 0, ly, { fill: theme.yellow, textColor: theme.darker, stroke: item.cZero ? theme.zeroStroke : null }, i, cFeel, this.#legendSvg)
                cur && sFeel !== undefined && new Label().draw(cur[0], ly - 10, ly, { fill: theme.blue, textColor: theme.darker, stroke: item.sZero ? theme.zeroStroke : null }, i + data.length, sFeel, this.#legendSvg)
                cur && eFeel !== undefined && new Label().draw(cur[0], 2 * (ly - 10), ly, { fill: theme.red, textColor: theme.darker }, i + data.length * 2, eFeel, this.#legendSvg)
            }
        }

        if (Init.isMobile) {
            const predefined = {
                coption: { fill: theme.yellow, key: 'cFeel', zero: 'cZero' },
                soption: { fill: theme.blue, key: 'sFeel', zero: 'sZero' },
                eoption: { fill: theme.red, key: 'eFeel' }
            }

            Store.sub('onOptionClick', (prev, current) => {
                this.#legendSvg.remove()
                this.#drawLegendCanvas()

                for (let i = 0; i < this.#columns; i++) {
                    const item = data[i]
                    if (!item)
                        continue

                    const curKey = this.#point(item.day, item.line)
                    const cur = grid.get(curKey);
                    const { fill, zero, key } = predefined[current]

                    const paddingTop = Init.isIOS ? 5 : 20
                    cur && item[key] !== undefined && new Label().draw(cur[0], paddingTop, this.#legendHeight - 50, {
                        fill, textColor: theme.darker,
                        stroke: zero && item[zero] ? theme.zeroStroke : null
                    }, i, item[key], this.#legendSvg)
                }
            })
        }
    }

    #drawLegendCanvas() {
        const legendSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        legendSvg.id = 'legend-canvas'
        legendSvg.classList = 'legend-canvas'
        legendSvg.style.width = this.#legendWidth
        legendSvg.style.height = this.#legendHeight + 'px'
        this.#legendSvg = legendSvg
        this.#canvasContainer.appendChild(this.#legendSvg)
    }

    #point(i, j) {
        return `${i};${j}`
    }
}