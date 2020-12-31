import { makeAutoObservable } from 'mobx'

class CanvasState {
  canvas: HTMLCanvasElement | null = null
  undoList: Array<string> = []
  redoList: Array<string> = []

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  pushToUndo(data: string) {
    this.undoList.push(data)
  }

  pushToRedo(data: string) {
    this.redoList.push(data)
  }

  undo() {
    if (!this.canvas) return

    const ctx = this.canvas?.getContext('2d')
    const { width, height } = this.canvas

    if (!ctx) return

    if (this.undoList.length > 0) {
      const dataUrl = this.undoList.pop()
      if (!dataUrl) return

      this.pushToRedo(this.canvas.toDataURL())
      const img = new Image()

      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
      }
    } else {
      ctx.clearRect(0, 0, width, height)
    }
  }

  redo() {
    if (!this.canvas) return

    const ctx = this.canvas?.getContext('2d')
    const { width, height } = this.canvas

    if (!ctx) return

    if (this.redoList.length > 0) {
      const dataUrl = this.redoList.pop()
      if (!dataUrl) return

      this.pushToUndo(this.canvas.toDataURL())
      const img = new Image()

      img.src = dataUrl
      img.onload = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)
      }
    }
  }
}

export default new CanvasState()