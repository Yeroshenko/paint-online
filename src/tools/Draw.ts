import Tool from './Tool'

export class Draw extends Tool {
  readonly toolName: string = 'Draw'
  private mouseIsDown: boolean = false

  constructor(canvas: HTMLCanvasElement | any) {
    super(canvas)
    this.listen()
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    document.onmouseup = this.mouseUpHandler.bind(this)
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
    this.ctx.arc(x, y, this.lineWidth / 2, 0, Math.PI * 2)
    this.ctx.fill()

    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
  }
}
