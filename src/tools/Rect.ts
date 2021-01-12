import Tool from './Tool'

export class Rect extends Tool {
  readonly toolName: string = 'Rectangle'
  private mouseIsDown: boolean = false
  private startX: number = 0
  private startY: number = 0
  private saved: string = ''
  private width: number = 0
  private height: number = 0

  constructor(canvas: HTMLCanvasElement | any, socket: WebSocket | null, sessionId: string) {
    super(canvas, socket, sessionId)
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

    this.startX = this.getXPosition(e)
    this.startY = this.getYPosition(e)
    this.saved = this.canvas.toDataURL()
  }

  mouseMoveHandler(e: MouseEvent): void {
    let currentX = this.getXPosition(e)
    let currentY = this.getYPosition(e)

    this.width = currentX - this.startX
    this.height = currentY - this.startY

    if (this.mouseIsDown) {
      this.draw(this.startX, this.startY, this.width, this.height)
    }
  }

  mouseUpHandler(): void {
    this.mouseIsDown = false
    this.ctx.beginPath()

    this.socket?.send(JSON.stringify({
      method: 'DRAW',
      id: this.sessionId,
      figure: {
        type: 'RECT',
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
        color: this.ctx.fillStyle
      }
    }))
  }

  draw(x: number, y: number, w: number, h: number): void {
    const img = new Image()
    img.src = this.saved

    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx.beginPath()
      this.ctx.rect(x, y, w, h)
      this.ctx.stroke()
    }
  }

  static serverDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string): void {
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.stroke()
  }
}
