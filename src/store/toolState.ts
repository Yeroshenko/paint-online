import { makeAutoObservable } from 'mobx'

type Tool = {
  toolName: ToolName
}

type ToolName = string

class ToolState {
  tool: Tool = {
    toolName: ''
  }

  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool: any): void {
    this.tool = tool
  }

  get toolName(): ToolName {
    return this.tool.toolName
  }
}

export default new ToolState()