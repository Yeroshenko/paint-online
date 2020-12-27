import { makeAutoObservable } from 'mobx'
import { Circle, Draw, Eraser, Line, Rect } from 'tools'

type ToolInstance = Circle | Draw | Eraser | Line | Rect

type ToolName = string

class ToolState {
  tool: ToolInstance | null = null

  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool: ToolInstance): void {
    this.tool = tool
  }

  setFillColor(color: string) {
    if (this.tool) {
      this.tool.fillColor = color
    }
  }

  setLineWidth(width: number) {
    if (this.tool) {
      this.tool.lineWidth = width
    }
  }

  get toolName(): ToolName {
    return this.tool ? this.tool.toolName : ''
  }
}

export default new ToolState()