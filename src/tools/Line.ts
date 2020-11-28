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

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    document.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseDownHandler(e: MouseEvent | any) {
    this.mouseIsDown = true
    this.ctx.lineWidth = this.lineWidth
    this.ctx.beginPath()

    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent | any) {
    let currentX = e.pageX - e.target.offsetLeft
    let currentY = e.pageY - e.target.offsetTop

    if (this.mouseIsDown) {
      this.draw(currentX, currentY)
    }
  }

  mouseUpHandler() {
    this.mouseIsDown = false
  }

  draw(x: number, y: number) {
    const img = new Image()

    img.src = this.saved

    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0 ,0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()

      this.ctx.moveTo(this.startX, this.startY)
      this.ctx.lineTo(x, y)

      this.ctx.stroke()
    }
  }
}
