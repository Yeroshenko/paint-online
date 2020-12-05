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

  get toolName(): ToolName {
    return this.tool ? this.tool.toolName : ''
  }
}

export default new ToolState()