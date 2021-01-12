export default class Tool {
  socket: WebSocket | null = null
  sessionId: string = ''
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public currentLineWidth: number = 10
  public currentFillColor: string = '#2E3A59'

  constructor(canvas: HTMLCanvasElement, socket: WebSocket | null, sessionId: string) {
    this.canvas = canvas
    this.socket = socket
    this.sessionId = sessionId
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.ctx.fillStyle = this.currentFillColor
    this.ctx.strokeStyle = this.currentFillColor
    this.destroyEvents()
  }

  set fillColor(color: string) {
    this.ctx.fillStyle = color
    this.ctx.strokeStyle = color
  }

  set lineWidth(width: number) {
    this.currentLineWidth = width
  }

  destroyEvents(): void {
    this.canvas.onmousedown = null
    this.canvas.onmousemove = null
    document.onmouseup = null
  }

  getXPosition(e: MouseEvent | any): number {
    return e.pageX - e.target.offsetLeft
  }

  getYPosition(e: MouseEvent | any): number {
    return e.pageY - e.target.offsetTop
  }
}
