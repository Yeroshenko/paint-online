import Tool from './Tool'

export class Line extends Tool {
  readonly toolName: string = 'Line'
  private mouseIsDown: boolean = false
  private startX: number = 0
  private startY: number = 0
  private saved: string = ''

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
    this.ctx.lineWidth = this.lineWidth
    this.ctx.beginPath()

    this.startX = this.getXPosition(e)
    this.startY = this.getYPosition(e)
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent): void {
    let currentX = this.getXPosition(e)
    let currentY = this.getYPosition(e)

    if (this.mouseIsDown) {
      this.draw(currentX, currentY)
    }
  }

  mouseUpHandler(): void {
    this.mouseIsDown = false
  }

  draw(x: number, y: number): void {
    const img = new Image()

    img.src = this.saved

    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()

      this.ctx.moveTo(this.startX, this.startY)
      this.ctx.lineTo(x, y)

      this.ctx.stroke()
    }
  }
}
