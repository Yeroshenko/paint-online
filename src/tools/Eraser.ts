import { Draw } from './Draw'

export class Eraser extends Draw {
  readonly toolName: string = 'Eraser'

  draw(x: number, y: number): void {
    this.ctx.lineTo(x, y)
    this.ctx.fillStyle = 'white'
    this.ctx.strokeStyle = 'white'
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.arc(x, y, this.lineWidth / 2, 0, Math.PI * 2)
    this.ctx.fill()

    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
  }
}