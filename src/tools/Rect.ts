import Tool from './Tool'

export class Rect extends Tool {
  readonly toolName: string = 'Rectangle'
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

    let width = currentX - this.startX
    let height = currentY - this.startY

    if (this.mouseIsDown) {
      this.draw(this.startX, this.startY, width, height)
    }
  }

  mouseUpHandler() {
    this.mouseIsDown = false
  }

  draw(x: number, y: number, w: number, h: number) {
    const img = new Image()
    img.src = this.saved

    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0 ,0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.rect(x, y, w, h)
      this.ctx.stroke()
    }
  }
}
