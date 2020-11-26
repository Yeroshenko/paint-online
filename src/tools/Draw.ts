import Tool from './Tool'

export class Draw extends Tool {
  mouseIsDown: boolean
  lineWidth: number

  constructor(canvas: HTMLCanvasElement) {
    super(canvas)
    this.listen()
    this.mouseIsDown = false
    this.lineWidth = 10
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseDownHandler(e: MouseEvent | any) {
    this.mouseIsDown = true
    this.ctx.lineWidth = this.lineWidth
    this.ctx.beginPath()
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  mouseMoveHandler(e: MouseEvent | any) {
    if (this.mouseIsDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
  }

  mouseUpHandler() {
    this.mouseIsDown = false
  }

  draw(x: number, y: number) {
    this.ctx.lineTo(x, y)
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.arc(x, y, this.lineWidth / 2, 0, Math.PI * 2);
    this.ctx.fill()

    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
  }

}