import DetailsContentPart from "../components/details-modal/content-part/content-part"
import ModalComponent from "../components/modal/modal"
import UtilsService from "../services/utils-service"
import { subject, sub } from 'a-simple-store'
import { Arrow } from "./arrow"
import { Figure } from "./figure"
import { Label } from "./label"

import titleTemplate from '../components/details-modal/title-part/title-part.html'
import Factory from "../components/component-factory"
import On from "../event-handler/on"
import Ls from "../services/local-storage-service"

export default class ChartDrawings {
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
        this.#legendSvg && canvasContainer.appendChild(this.#legendSvg)
        this.#chartContainer.appendChild(canvasContainer)
        this.#canvasEvents();

        this.#columns = columns !== undefined ? columns : 0
        this.#rows = rows !== undefined ? rows : 0
    }

    draw(theme, chartHeight, legendHeight, options) {
        const { offsetWidth, offsetHeight } = this.#canvasContainer

        const chartSize = UtilsService.isHorizontal
            ? [offsetWidth, offsetHeight]
            : [offsetWidth, offsetHeight * (chartHeight ? chartHeight : UtilsService.isMobile ? 0.5 : 0.4)]
        const legendSize = [offsetWidth, offsetHeight * (legendHeight ? legendHeight : (UtilsService.isMobile ? (UtilsService.isIOS ? 0.4 : 0.5) : 0.6))] // TODO: for Chrome and Safari on IOS reduce height
        this.#legendHeight = legendSize[1]

        this.#chartSvg.style.height = chartSize[1] + 'px'
        this.#legendSvg && (this.#legendSvg.style.height = legendSize[1] + 'px')

        const grid = this.#drawGrid(chartSize[1], theme, options)
        const data = subject('eventData').cur
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

            if ((i + 1) % 365 === 0) {
                new Figure('text').draw({
                    x: nX, y: headerCirclePadding + circleLineGap + 5, fill: theme.yellow, outline: 'none',
                    textAnchor: 'middle', class: 'svg-circle-text', cursor: 'pointer', id: 'svg-day-' + (i + 1)
                }, this.#chartSvg, true, { text: ((i + 1) / 365) + ' РІК' })

                new Figure('line').draw({ x1: nX, y1: vgap, x2: nX, y2: chartHeight - dotGap, strokeWidth: 3, stroke: theme.yellow, class: 'appear-animation' }, this.#chartSvg, true)
            } else {
                if (highlightLastColumn && i === this.#columns - 1) {
                    fill = textColor = theme.blue;
                }

                new Figure('text').draw({
                    x: nX, y: headerCirclePadding + circleLineGap + 5, fill: textColor, outline: 'none',
                    textAnchor: 'middle', class: 'svg-circle-text', cursor: 'pointer', id: 'svg-day-' + (i + 1)
                }, this.#chartSvg, true, { text: (i + 1) + '' })
            }

            for (let j = 0, y = vgap; j < this.#rows; j++, y += dotGap) {
                (i + 1) % 365 === 0 || gridCircle.use({ x: nX, y: y + circleLineGap, fill, class: 'appear-animation' }, this.#chartSvg)
                points.set(this.#point(i + 1, j + 1), [nX, y + circleLineGap])
            }

            dX += vgap

            i === this.#columns - 1 && (endX = dX)
        }
        this.#chartSvg.style.width = this.#legendWidth = endX + left + 'px'
        this.#legendSvg && (this.#legendSvg.style.width = endX + left + 'px')
        scrollToEnd && (this.#canvasContainer.scrollLeft = endX + left)

        this.#canvasContainer.addEventListener("wheel", e => {
            e.preventDefault();
            this.#canvasContainer.scrollLeft += e.deltaY;
        });

        sub('daysInput', (_, cur) => {
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

            const { line, cLine, sLine } = item

            const curKey = this.#point(item.day, line)
            const cur = grid.get(curKey);

            if (data[i + 1] && cur) {

                let next
                let dashed = false

                if (!data[i + 1].line) {
                    let nextDay = 0;
                    let nextLine = 0;
                    for (let k = 1; ; k++) {
                        const d = data[i + k + 1]
                        if (!!d.line) {
                            nextDay = d.day
                            nextLine = d.line
                            break;
                        }
                    }
                    next = grid.get(this.#point(nextDay, nextLine))
                    dashed = true
                } else {
                    next = grid.get(this.#point(item.day + 1, data[i + 1].line))
                }

                next && new Figure('line').draw({ x1: cur[0], y1: cur[1], x2: next[0], y2: next[1], strokeWidth: 2, stroke: theme.bright, class: 'grow-animation', strokeDasharray: dashed ? '4' : 'none' },
                    this.#chartSvg, true)
            }

            if (cLine !== undefined && cLine !== line) {
                const target = grid.get(item.day + ';' + cLine)
                new Arrow().draw([cur, target], 10, gridCircleR, { fill: theme.yellow, class: 'grow-animation' }, this.#chartSvg)
            }

            if (sLine !== undefined && sLine !== line) {
                const target = grid.get(item.day + ';' + sLine)
                new Arrow().draw([cur, target], 10, gridCircleR, { fill: theme.blue, class: 'grow-animation' }, this.#chartSvg)
            }

            cur && circle.use({ x: cur[0], y: cur[1], fill: theme.darker, stroke: theme.bright, class: 'appear-animation' }, this.#chartSvg)

            if (!UtilsService.isMobile) {
                const asTaras = Ls.get('asTaras')
                const ly = this.#legendHeight / 3
                this.#drawLabels(asTaras, cur, i, item, theme, data.length)
            }
        }

        if (!UtilsService.isMobile) {
            sub('asTaras', (_, asTaras) => {
                this.#legendSvg && this.#legendSvg.remove()
                this.#drawLegendCanvas()

                for (let i = 0; i < this.#columns; i++) {
                    const item = data[i]
                    if (!item)
                        continue

                    const { line } = item

                    const curKey = this.#point(item.day, line)
                    const cur = grid.get(curKey);
                    this.#drawLabels(asTaras, cur, i, item, theme, data.length)
                }
            })
        }

        if (UtilsService.isMobile) {
            const predefined = {
                coption: { fill: theme.yellow, key: 'cFeel', zero: 'cZero' },
                soption: { fill: theme.blue, key: 'sFeel', zero: 'sZero' },
                eoption: { fill: theme.red, key: 'eFeel' }
            }

            this.#legendSvg && sub('onOptionClick', (_, current) => {
                this.#legendSvg.remove()
                this.#drawLegendCanvas()

                for (let i = 0; i < this.#columns; i++) {
                    const item = data[i]
                    if (!item)
                        continue

                    const curKey = this.#point(item.day, item.line)
                    const cur = grid.get(curKey);
                    const { fill, zero, key } = predefined[current]

                    const paddingTop = UtilsService.isIOS ? 5 : 20
                    cur && item[key] !== undefined && new Label().draw(cur[0], paddingTop, this.#legendHeight - 50, {
                        fill, textColor: theme.darker,
                        stroke: zero && item[zero] ? theme.zeroStroke : null
                    }, i, item[key], this.#legendSvg)
                }
            })
        }
        UtilsService.isHorizontal && (this.#chartContainer.style.height = 'auto')
    }

    #canvasEvents() {
        On.click(this.#chartSvg, e => {
            const id = e.target?.id
            if (id && id.includes('svg-day')) {
                const dayStr = id.split('-')[2]
                if (!dayStr)
                    return;

                const day = parseInt(dayStr)
                Factory.mount(ModalComponent, { modalData: { titleTemplate, contentRef: DetailsContentPart, data: { day } } })
            }
        })
    }

    #drawLabels(asTaras, cur, i, item, theme, length) {
        const { cFeel, sFeel, eFeel, cZero, sZero } = item
        const ly = this.#legendHeight / 3
        const style = { textColor: theme.darker }
        let eFeelMargin = 2 * (ly - 13)

        if (!cur) {
            return
        }

        if (!asTaras) {
            cFeel !== undefined && new Label().draw(cur[0], 2, ly, { fill: theme.yellow, ...style, stroke: cZero ? theme.zeroStroke : null }, i, cFeel, this.#legendSvg)
            sFeel !== undefined && new Label().draw(cur[0], ly - 12, ly, { fill: theme.blue, ...style, stroke: sZero ? theme.zeroStroke : null }, i + length, sFeel, this.#legendSvg)
        } else {
            i % 2 == 0 && sFeel !== undefined && new Label().draw(cur[0], 0, ly, { fill: theme.blue, ...style }, i, sFeel, this.#legendSvg)
            i % 2 != 0 && cFeel !== undefined && new Label().draw(cur[0], 0, ly, { fill: theme.yellow, ...style }, i, cFeel, this.#legendSvg)
            i % 2 == 0 && cFeel !== undefined && new Label().draw(cur[0], ly - 20, ly, { fill: theme.yellow, ...style }, i + length, cFeel, this.#legendSvg)
            i % 2 != 0 && sFeel !== undefined && new Label().draw(cur[0], ly - 20, ly, { fill: theme.blue, ...style }, i + length, sFeel, this.#legendSvg)
            eFeelMargin = 2 * (ly - 5)
        }

        eFeel !== undefined && new Label().draw(cur[0] + 0.55, eFeelMargin, ly, { fill: theme.red, ...style }, i + length * 2, eFeel, this.#legendSvg)
    }

    #drawLegendCanvas() {
        if (UtilsService.isHorizontal)
            return;

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