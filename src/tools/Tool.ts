export default class Tool {
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  readonly lineWidth: number = 10

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    this.destroyEvents()
  }

  destroyEvents() {
    this.canvas.onmousedown = null
    this.canvas.onmousemove = null
    document.onmouseup = null
  }
}