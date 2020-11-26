const SET_TOOL = 'TOOL/SET_TOOL'

const initialState = {
  tool: null
}

export type InitialState = typeof initialState

export const toolReducer = (state = initialState, action: any): InitialState => {
  switch (action.type) {
    case SET_TOOL:
      return { ...state, tool: action.tool }

    default:
      return state
  }
}

type SetTool = {
  type: typeof SET_TOOL
  tool: any
}

export const setTool = (tool: any): SetTool => ({ type: SET_TOOL, tool })

