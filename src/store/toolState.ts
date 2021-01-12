import { makeAutoObservable } from 'mobx'
import { Circle, Draw, Eraser, Line, Rect } from 'tools'

type ToolInstance = Circle | Draw | Eraser | Line | Rect

type ToolName = string
type LineWidth = number

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
      this.tool.currentLineWidth = width
    }
  }

  get toolName(): ToolName {
    return this.tool ? this.tool.toolName : ''
  }

  get lineWidth(): LineWidth {
    return this.tool?.currentLineWidth || 0
  }
}

export default new ToolState()