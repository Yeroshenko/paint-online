import { AppState } from 'store'

export const getToolName = (state: AppState): string => state.tool.tool.toolName