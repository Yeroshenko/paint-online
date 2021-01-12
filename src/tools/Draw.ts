import Tool from './Tool'

export class Draw extends Tool {
  readonly toolName: string = 'Draw'
  private mouseIsDown: boolean = false

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
    this.ctx.moveTo(this.getXPosition(e), this.getYPosition(e))
  }

  mouseMoveHandler(e: MouseEvent): void {
    if (this.mouseIsDown) {
      this.socket?.send(JSON.stringify({
        method: 'DRAW',
        id: this.sessionId,
        figure: {
          type: 'BRUSH',
          x: this.getXPosition(e),
          y: this.getYPosition(e)
        }
      }))
    }
  }

  mouseUpHandler(): void {
    this.mouseIsDown = false

    this.socket?.send(JSON.stringify({
      method: 'DRAW',
      id: this.sessionId,
      figure: {
        type: 'FINISH'
      }
    }))
  }

  static draw(ctx: CanvasRenderingContext2D, x: number, y: number, currentLineWidth: number): void {
    ctx.lineTo(x, y)
    ctx.stroke()

    ctx.beginPath()
    ctx.arc(x, y, currentLineWidth / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(x, y)
  }
}
