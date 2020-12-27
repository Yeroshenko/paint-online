import Tool from './Tool'

export class Draw extends Tool {
  readonly toolName: string = 'Draw'
  private mouseIsDown: boolean = false

  constructor(canvas: HTMLCanvasElement | any) {
    super(canvas)
    this.listen()
  }

  listen(): void {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    document.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseDownHandler(e: MouseEvent): void {
    this.mouseIsDown = true
    this.ctx.lineWidth = this.currentLineWidth
    this.ctx.beginPath()
    this.ctx.moveTo(this.getXPosition(e), this.getYPosition(e))
  }

  mouseMoveHandler(e: MouseEvent): void {
    if (this.mouseIsDown) {
      this.draw(this.getXPosition(e), this.getYPosition(e))
    }
  }

  mouseUpHandler(): void {
    this.mouseIsDown = false
  }

  draw(x: number, y: number): void {
    this.ctx.lineTo(x, y)
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.arc(x, y, this.currentLineWidth / 2, 0, Math.PI * 2)
    this.ctx.fill()

    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
  }
}
